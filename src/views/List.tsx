import styled from "styled-components";
import SongEntry from "../components/SongEntry";
import songsData from "../data/songs.json";

const List = () => {
  return (
    <Container>
      {songsData.map((song, index) => (
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
