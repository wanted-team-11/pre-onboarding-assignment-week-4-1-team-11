import React, { useState } from "react";
import { UserOutlined, LogoutOutlined, BankOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import styled from "styled-components";
import storage from "../storage/storage";
import { useNavigate } from "react-router-dom";

function Sider() {
  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      icon,
      key,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("계좌 목록", "1", <BankOutlined />),
    getItem("사용자 목록", "2", <UserOutlined />),
    getItem("로그아웃", "3", <LogoutOutlined />),
  ];

  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("1");

  const logOut = () => {
    navigate("/");
    storage.remove();
  };

  const onClickMenu: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);
    if (e.key === "1") navigate("/accounts");
    if (e.key === "2") navigate("/users");
    if (e.key === "3") logOut();
  };

  return (
    <MainSider>
      <Menu
        onClick={onClickMenu}
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={items}
      />
    </MainSider>
  );
}

const MainSider = styled(Layout.Sider)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Sider;
