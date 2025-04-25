import styled from 'styled-components';
import list from "../assets/icons/list.svg";
import map from "../assets/icons/map.svg";
import hamburger from "../assets/icons/hamburger.svg";

interface NavigationBarProps {
  currentPage: number;
  changePage: (page: number) => void;
}

const Navigationbar = ({ currentPage, changePage }:NavigationBarProps) => {
  return (
    <NavContainer>
      <NavButton 
        active={currentPage === 0} 
        onClick={() => changePage(0)}
      >
        <Icon src={list} active={currentPage === 0} />
      </NavButton>
      <NavButton 
        active={currentPage === 1} 
        onClick={() => changePage(1)}
      >
        <Icon src={map} active={currentPage === 1} />
      </NavButton>
      <NavButton 
        active={currentPage === 2} 
        onClick={() => changePage(2)}
      >
        <Icon src={hamburger} active={currentPage === 2} />
      </NavButton>
    </NavContainer>
  );
};

export default Navigationbar;

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5px;
  background: ${props => props.theme.colors.general.background};
  border-top: 1px solid ${props => props.theme.colors.general.black};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

const NavButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background-color: ${props => props.active ? props.theme.colors.general.white : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${props => !props.active && props.theme.colors.general.lightGray};
  }
`;

const Icon = styled.img<{ active?: boolean }>`
    width: 24px;
    height: 24px;
    filter: ${props => props.active ? 'brightness(0)' : 'brightness(0) invert(1)'};
`;
