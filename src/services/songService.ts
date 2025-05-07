import songsData from "../data/songs.json";

export interface Song {
  id: number;
  title: string;
  artist: string;
  transitions: {
    before: Transition[];
    after: Transition[];
  };
}

export interface Transition {
  songId: number;
  rating: number;
}

const validateRating = (rating: number): boolean => {
  return rating >= 1 && rating <= 5;
};

const validateSongId = (id: number): boolean => {
  return songsData.some(song => song.id === id);
};

export const getAllSongs = (): Song[] => {
  return [...songsData];
};

export const getSongById = (id: number): Song | undefined => {
  const song = songsData.find(song => song.id === id);
  return song ? { ...song } : undefined;
};

export const addSong = (song: Omit<Song, 'id'>): Song => {
  const newId = Math.max(...songsData.map(s => s.id)) + 1;
  const newSong = { ...song, id: newId };
  songsData.push(newSong);
  return { ...newSong };
};

export const updateSong = (id: number, updatedSong: Partial<Song>): Song | undefined => {
  const index = songsData.findIndex(song => song.id === id);
  if (index === -1) return undefined;

  const updated = { ...songsData[index], ...updatedSong };
  songsData[index] = updated;
  return { ...updated };
};

export const deleteSong = (id: number): boolean => {
  const index = songsData.findIndex(song => song.id === id);
  if (index === -1) return false;

  songsData.splice(index, 1);
  return true;
};

export const addTransition = (
  songId: number,
  targetSongId: number,
  rating: number,
  type: 'before' | 'after'
): boolean => {
  if (!validateRating(rating) || !validateSongId(songId) || !validateSongId(targetSongId)) {
    return false;
  }

  const song = songsData.find(s => s.id === songId);
  if (!song) return false;

  const transition: Transition = { songId: targetSongId, rating };
  song.transitions[type] = [...song.transitions[type], transition];
  return true;
};

export const removeTransition = (
  songId: number,
  targetSongId: number,
  type: 'before' | 'after'
): boolean => {
  const song = songsData.find(s => s.id === songId);
  if (!song) return false;

  const index = song.transitions[type].findIndex(t => t.songId === targetSongId);
  if (index === -1) return false;

  song.transitions[type] = song.transitions[type].filter(t => t.songId !== targetSongId);
  return true;
};

export const updateTransitionRating = (
  songId: number,
  targetSongId: number,
  newRating: number,
  type: 'before' | 'after'
): boolean => {
  if (!validateRating(newRating)) return false;

  const song = songsData.find(s => s.id === songId);
  if (!song) return false;

  const transition = song.transitions[type].find(t => t.songId === targetSongId);
  if (!transition) return false;

  song.transitions[type] = song.transitions[type].map(t => 
    t.songId === targetSongId ? { ...t, rating: newRating } : t
  );
  return true;
};