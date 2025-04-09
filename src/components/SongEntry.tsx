import styled from "styled-components";
import arrow from "../assets/icons/arrow.svg";
import { useState } from "react";
import songsData from "../data/songs.json";

interface Props {
  id: number;
  title: string;
  artist: string;
  index: number;
}

const SongEntry = ({ id, title, artist, index }: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const currentSong = songsData.find(song => song.id === id);
  
  const transitionsBefore = currentSong?.transitions.before || [];
  const transitionsAfter = currentSong?.transitions.after || [];
  
  const beforeSongs = transitionsBefore.map(transition => {
    const song = songsData.find(s => s.id === transition.songId);
    return { ...song, rating: transition.rating };
  });
  
  const afterSongs = transitionsAfter.map(transition => {
    const song = songsData.find(s => s.id === transition.songId);
    return { ...song, rating: transition.rating };
  });

  return (
    <Container onClick={() => setIsOpened(!isOpened)} index={index} >
      <MainContainer>
      <AlbumCover />
      <TextContainer>
        <Title>{title}</Title>
        <Artist>{artist}</Artist>
      </TextContainer>
      <Arrow src={arrow} opened={isOpened} />
      </MainContainer>
      {isOpened && (
        <TransitionContainer>
          {beforeSongs.length > 0 && (
            <TransitionSection>
              <TransitionTitle>Transitions well after:</TransitionTitle>
              {beforeSongs.map(song => (
                <TransitionItem key={song.id}>
                  <TransitionSong rating={song.rating}>{song.title} - {song.artist}</TransitionSong>
                  <RatingContainer>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} filled={i < song.rating}>★</Star>
                    ))}
                  </RatingContainer>
                </TransitionItem>
              ))}
            </TransitionSection>
          )}
          
          {afterSongs.length > 0 && (
            <TransitionSection>
              <TransitionTitle>Transitions well before:</TransitionTitle>
              {afterSongs.map(song => (
                <TransitionItem key={song.id}>
                  <TransitionSong rating={song.rating}>{song.title} - {song.artist}</TransitionSong>
                  <RatingContainer>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} filled={i < song.rating}>★</Star>
                    ))}
                  </RatingContainer>
                </TransitionItem>
              ))}
            </TransitionSection>
          )}
          
          {beforeSongs.length === 0 && afterSongs.length === 0 && (
            <NoTransitions>No transitions available</NoTransitions>
          )}
        </TransitionContainer>
      )}
    </Container>
  );
};

export default SongEntry;

const Container = styled.div<{ index: number }>`
  width: 100%;
  min-height: 200px;
  background: ${({ theme }) => theme.colors.general.background};
  border-top: ${({ index }) => index === 0 ? '5px solid' : 'none'} ${({ theme }) => theme.colors.general.lightGray};
  border-bottom: 5px solid ${({ theme }) => theme.colors.general.lightGray};
  display: flex;
  flex-direction: column;
  padding: 25px;
  box-sizing: border-box;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 200px;
  cursor: pointer;
`;

const AlbumCover = styled.div`
  height: 150px;
  width: 150px;
  margin-right: 25px;
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
  box-sizing: border-box;
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

const TransitionContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.general.darkGray};
  margin-top: 20px;
  border-radius: 8px;
`;

const TransitionSection = styled.div`
  margin-bottom: 20px;
`;

const TransitionTitle = styled.h3`
  ${({ theme }) => theme.fontStyles.transitionTitle}
  color: white;
  margin-bottom: 10px;
`;

const TransitionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: ${({ theme }) => theme.colors.general.gray};
  margin-bottom: 10px;
  border-radius: 4px;
`;

const TransitionSong = styled.div<{ rating: number }>`
  ${({ theme }) => theme.fontStyles.transitionText};
  font-weight: ${props => props.rating == 5 ? 'bold' : 'normal'};
`;

const RatingContainer = styled.div`
  display: flex;
`;

const Star = styled.span<{ filled: boolean }>`
  color: ${props => props.filled ? props.theme.colors.icons.star.filled : props.theme.colors.icons.star.empty};
  margin-left: 2px;
`;

const NoTransitions = styled.div`
  ${({ theme }) => theme.fontStyles.transitionText};
  color: white;
  text-align: center;
  padding: 20px;
`;
