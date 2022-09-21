import styled from "styled-components";
import {
  LogoutOutlined,
  UserOutlined,
  AccountBookOutlined,
  StockOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";

export default function Sider() {
  const [collapsed, setCollapsed] = useState(false);
  type ItemTypes = Required<MenuProps>["items"][number];

  function getItem(
    label: string,
    key: string,
    icon?: JSX.Element | undefined,
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
    getItem("계좌 목록", "1", <AccountBookOutlined />, [
      getItem("투자 계좌", "2", <StockOutlined />),
    ]),
    getItem("사용자", "3", <UserOutlined />),
    getItem("로그아웃", "4", <LogoutOutlined />),
  ];

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
      />
    </SiderContainer>
  );
}

const SiderContainer = styled(Layout.Sider)`
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
