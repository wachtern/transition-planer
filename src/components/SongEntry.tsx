import styled from "styled-components";
import arrow from "../assets/icons/arrow.svg";
import { useState } from "react";

interface Props {
  title: string;
  artist: string;
}

const songEntry = ({ title, artist }: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isMainTitle, setIsMainTitle] = useState<boolean>(true);

  return (
    <Container mainTitle={isMainTitle} onClick={() => setIsOpened(!isOpened)}>
      <AlbumCover />
      <TextContainer>
        <Title>{title}</Title>
        <Artist>{artist}</Artist>
      </TextContainer>
      {isMainTitle && <Arrow src={arrow} opened={isOpened} />}
    </Container>
  );
};

export default songEntry;

const Container = styled.div<{ mainTitle: boolean }>`
  width: 100%;
  height: 200px;
  background: ${({ theme, mainTitle }) =>
    mainTitle ? theme.colors.general.background : theme.colors.general.gray};
  border-top: 5px solid ${({ theme }) => theme.colors.general.lightGray};
  border-bottom: 5px solid ${({ theme }) => theme.colors.general.lightGray};
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 25px;
  gap: 25px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
      background: ${({ theme, mainTitle }) =>
        mainTitle && theme.colors.general.darkGray};
`;

const AlbumCover = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
  background: rgb(
    ${Math.random() * 255},
    ${Math.random() * 255},
    ${Math.random() * 255}
  );
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
`;

const Title = styled.div`
  ${({ theme }) => theme.fontStyles.title}
`;
const Artist = styled.div`
  ${({ theme }) => theme.fontStyles.artist}
`;

const Arrow = styled.img<{ opened: boolean }>`
  transform: rotate(${(props) => (props.opened ? 180 : 0)}deg);
  transition: transform 0.3s;
  margin-right: 50px;
  margin-left: auto;
`;
