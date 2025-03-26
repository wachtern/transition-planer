import styled from "styled-components";

const List = () => {
  return <Container></Container>;
};

export default List;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.general.background};
`;
