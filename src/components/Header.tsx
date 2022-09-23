import { useEffect, useState } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

export default function Header() {
  const userEmail = localStorage.getItem("useremail");
  const location = useLocation();
  const pagelocation = location.pathname;
  const [pageName, setPageName] = useState<string>("계좌 목록");

  useEffect(() => {
    if (pagelocation === "/account_list") setPageName("계좌 목록");
    if (pagelocation === "/user_list") setPageName("사용자 목록");
  }, [pagelocation]);
  return (
    <HeaderContainer>
      <div>{pageName}</div>
      <div>{userEmail}님</div>
    </HeaderContainer>
  );
}

const HeaderContainer = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  color: white;
`;
