import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuildingColumns,
  faUser,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import storage from '../../../storage';
import MenuList from './MenuList';

const SideBar = () => {
  const [isFocus, setIsFocus] = useState(2);
  return (
    <SidebarWrapper>
      <SideBarTitle>PREFACE</SideBarTitle>
      <ul>
        {SIDEBAR_DATA.map(({ id, name, path, icon, logout }) => (
          <MenuList
            key={id}
            id={id}
            name={name}
            path={path!}
            icon={icon}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            logout={logout}
          />
        ))}
      </ul>
    </SidebarWrapper>
  );
};

export default SideBar;

const SIDEBAR_DATA = [
  {
    id: 2,
    name: '계좌 목록',
    keyword: 'accounts',
    path: '/content/',
    icon: <FontAwesomeIcon icon={faBuildingColumns} />,
  },
  {
    id: 3,
    name: '사용자 목록',
    keyword: 'users',
    path: '/content/users',
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    id: 9999,
    name: '로그아웃',
    keyword: 'logout',
    icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    logout: () => {
      storage.remove('accessToken');
      window.location.reload();
    },
  },
];

const SideBarTitle = styled.div`
  font-family: fantasy;
  font-size: 36px;
  font-weight: bolder;
  margin-top: 40px;
  margin-bottom: 50px;
`;

const SidebarWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #041627;
  color: white;
  z-index: 10;
`;
