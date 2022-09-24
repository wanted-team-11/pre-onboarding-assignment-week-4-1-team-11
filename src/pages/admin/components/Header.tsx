import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { StorageKey, tokenStorage } from "../../../storage";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const { pathname } = location;
  const email = tokenStorage.get(StorageKey.EMAIL)?.split("@")[0];
  const [pageName, setPageName] = useState("사용자 목록");
  const { Header } = Layout;

  useEffect(() => {
    if (pathname.includes("/admin/user-list")) setPageName("사용자 목록");
    if (pathname.includes("/admin/user-list/detail"))
      setPageName("사용자 상세 정보");
    if (pathname.includes("/admin/account-list")) setPageName("계좌목록");
    if (pathname.includes("/admin/account-list/detail"))
      setPageName("계좌 상세 정보");
  }, [pathname]);

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        color: "white",
        marginBottom: "20px",
        height: "68px",
        minWidth: "340px",
      }}
    >
      <div>{pageName}</div>
      <div>환영합니다, {email}님</div>
    </Header>
  );
}

export default Header;
