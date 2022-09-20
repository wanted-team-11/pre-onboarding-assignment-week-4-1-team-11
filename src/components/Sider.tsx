import React from "react";
import { UserOutlined, LogoutOutlined, BankOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import styled from "styled-components";

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
    getItem("계좌 목록", "1", <BankOutlined />, [
      getItem("계좌 1", "2"),
      getItem("계좌 2", "3"),
    ]),
    getItem("사용자", "4", <UserOutlined />),
    getItem("로그아웃", "5", <LogoutOutlined />),
  ];

  return (
    <MainSider>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
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
