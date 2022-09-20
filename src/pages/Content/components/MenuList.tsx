import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface ListProps {
  id: number;
  name: string;
  path: string;
  icon: JSX.Element;
  logout?: () => void;
  isFocus: number;
  setIsFocus: React.Dispatch<React.SetStateAction<number>>;
}

interface StyleProps {
  isFocus: number;
  num: number;
}

const MenuList = ({
  id,
  name,
  path,
  icon,
  logout,
  setIsFocus,
  isFocus,
}: ListProps) => {
  const navigate = useNavigate();

  const showContents = (path: string, id: number) => {
    navigate(path);
    setIsFocus(id);
  };

  return (
    <MenuElement
      key={id}
      num={id}
      isFocus={isFocus}
      onClick={() => {
        showContents(path!, id);
        logout!();
      }}
    >
      {icon}
      {name}
    </MenuElement>
  );
};

export default MenuList;

const MenuElement = styled.li<StyleProps>`
  display: flex;
  align-items: center;
  width: 270px;
  height: 50px;
  padding-left: 30px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ isFocus, num }) => (isFocus === num ? 'white' : '#6c7681')};
  background-color: ${({ isFocus, num }) =>
    isFocus === num ? '#468ef7' : 'inherit'};

  svg {
    margin-right: 15px;
  }

  & + & {
    border-top: 1px solid gray;
  }

  &:hover {
    background-color: #468ef7;
    color: white;
  }
`;
