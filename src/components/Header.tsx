import React from "react";
import { Layout } from "antd";
import styled from "styled-components";

function Header() {
  return (
    <MainHeader>
      <div>페이지명</div>
      <div>사용자명</div>
    </MainHeader>
  );
}

const MainHeader = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  color: white;
`;

export default Header;
