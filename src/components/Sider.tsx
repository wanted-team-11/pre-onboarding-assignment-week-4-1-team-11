import styled from "styled-components";
import {
  LogoutOutlined,
  UserOutlined,
  AccountBookOutlined,
  StockOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import type { MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sider() {
  const [collapsed, setCollapsed] = useState(false);

  type ItemTypes = Required<MenuProps>["items"][number];

  function getItem(
    label: string,
    key: string,
    icon?: JSX.Element,
    children?: ItemTypes[]
  ) {
    return {
      icon,
      key,
      children,
      label,
    };
  }

  const items: ItemTypes[] = [
    
    getItem("계좌 목록", "0", <AccountBookOutlined />, [
      getItem("투자 계좌", "1", <StockOutlined />),
    ]),
    getItem("사용자", "2", <UserOutlined />),
    getItem("로그아웃", "3", <LogoutOutlined />),
  ];
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("1");

  const logOut = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  const onClickMenu: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);
    if (e.key === "1") navigate("/account_list");
    if (e.key === "2") navigate("/user_list");
    if (e.key === "3") logOut();
  };

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === "/account_list") setSelectedKey("1");
    if (pathname === "/user_list") setSelectedKey("2");
  }, [pathname]);

  return (
    <SiderContainer
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        onClick={onClickMenu}
        selectedKeys={[selectedKey]}
      />
    </SiderContainer>
  );
}

const SiderContainer = styled(Layout.Sider)`
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
