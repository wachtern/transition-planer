import styled from "styled-components";
import SongEntry from "../components/songEntry";

const List = () => {
  return (
    <Container>
      <SongEntry />
    </Container>
  );
};

export default List;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.general.background};
`;
