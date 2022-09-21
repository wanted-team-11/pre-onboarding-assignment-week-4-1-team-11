import React from "react";
import { Layout } from "antd";
import styled from "styled-components";

export default function Header() {
  return (
    <HeaderContainer>
      <div>투자 계좌</div>
      <div>사용자 이름</div>
    </HeaderContainer>
  );
}

const HeaderContainer = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  color: white;
`;
