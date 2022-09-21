import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import storage from "../storage/storage";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const { pathname } = location;
  const email = storage.get("EMAIL");
  const [pageName, setPageName] = useState("계좌 목록");

  useEffect(() => {
    if (pathname === "/accounts") setPageName("계좌 목록");
    if (pathname === "/users") setPageName("사용자 목록");
  }, [pathname]);

  return (
    <MainHeader>
      <div>{pageName}</div>
      <div>환영합니다, {email}님</div>
    </MainHeader>
  );
}

const MainHeader = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  color: white;
`;

export default Header;
