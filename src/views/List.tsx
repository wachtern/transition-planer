import { useEffect } from "react";
import styled from "styled-components";
import SongEntry from "../components/SongEntry";
import { useSongStore } from "../store/songStore";

const List = () => {
  const { 
    songs, 
    isLoading,
    error,
    refreshSongs
  } = useSongStore();

  useEffect(() => {
    refreshSongs();
  }, [refreshSongs]);

  if (isLoading) {
    return <LoadingContainer>Loading songs...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  if (songs.length === 0) {
    return <EmptyContainer>No songs available</EmptyContainer>;
  }

  return (
    <Container>
      {songs.map((song, index) => (
        <SongEntry 
          key={song.id}
          id={song.id}
          title={song.title} 
          artist={song.artist}
          index={index}
        />
      ))}
    </Container>
  );
};

export default List;

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  background: ${({ theme }) => theme.colors.general.background};
  padding: 20px;
  box-sizing: border-box;
`;

const LoadingContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.general.lightGray};
`;

const ErrorContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.general.error};
`;

const EmptyContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.general.lightGray};
`;
