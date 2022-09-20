import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <HeaderWrapper>
      <TitleSide>
        <FontAwesomeIcon icon={faSliders} />
        title
      </TitleSide>
      <RightSide>
        <div>개발</div>
        <div>도움말</div>
        <div>알림창</div>
        <div>핀트?</div>
      </RightSide>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #e1e4e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleSide = styled.div`
  padding-left: 20px;
  font-size: 24px;

  svg {
    margin-right: 15px;
  }
`;

const RightSide = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-around;
`;
