import { create } from 'zustand';
import { Song, getAllSongs, addSong, updateSong, deleteSong, addTransition, removeTransition, updateTransitionRating } from '../services/songService';

interface SongStore {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  refreshSongs: () => Promise<void>;
  addNewSong: (song: Omit<Song, 'id'>) => Promise<void>;
  updateExistingSong: (id: number, updatedSong: Partial<Song>) => Promise<void>;
  removeSong: (id: number) => Promise<void>;
  addNewTransition: (songId: number, targetSongId: number, rating: number, type: 'before' | 'after') => Promise<void>;
  removeExistingTransition: (songId: number, targetSongId: number, type: 'before' | 'after') => Promise<void>;
  updateExistingTransitionRating: (songId: number, targetSongId: number, newRating: number, type: 'before' | 'after') => Promise<void>;
}

export const selectSongById = (id: number) => (state: SongStore) => 
  state.songs.find(song => song.id === id);

export const selectSongsWithTransitions = (state: SongStore) =>
  state.songs.filter(song => 
    song.transitions.before.length > 0 || song.transitions.after.length > 0
  );

export const useSongStore = create<SongStore>((set, get) => ({
  songs: [],
  isLoading: false,
  error: null,
  
  refreshSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const songs = getAllSongs();
      set({ songs, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load songs', isLoading: false });
    }
  },
  
  addNewSong: async (song) => {
    set({ isLoading: true, error: null });
    try {
      addSong(song);
      const songs = getAllSongs();
      set({ songs, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to add song', isLoading: false });
    }
  },
  
  updateExistingSong: async (id, updatedSong) => {
    set({ isLoading: true, error: null });
    try {
      updateSong(id, updatedSong);
      const songs = getAllSongs();
      set({ songs, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to update song', isLoading: false });
    }
  },
  
  removeSong: async (id) => {
    set({ isLoading: true, error: null });
    try {
      deleteSong(id);
      const songs = getAllSongs();
      set({ songs, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to remove song', isLoading: false });
    }
  },
  
  addNewTransition: async (songId, targetSongId, rating, type) => {
    set({ isLoading: true, error: null });
    try {
      addTransition(songId, targetSongId, rating, type);
      const songs = getAllSongs();
      set({ songs, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to add transition', isLoading: false });
    }
  },
  
  removeExistingTransition: async (songId, targetSongId, type) => {
    set({ isLoading: true, error: null });
    try {
      removeTransition(songId, targetSongId, type);
      const songs = getAllSongs();
      set({ songs, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to remove transition', isLoading: false });
    }
  },
  
  updateExistingTransitionRating: async (songId, targetSongId, newRating, type) => {
    set({ isLoading: true, error: null });
    try {
      updateTransitionRating(songId, targetSongId, newRating, type);
      const songs = getAllSongs();
      set({ songs, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to update transition rating', isLoading: false });
    }
  },
})); 