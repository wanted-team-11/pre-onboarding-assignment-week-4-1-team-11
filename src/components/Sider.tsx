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
import { useNavigate } from "react-router-dom";

import SiderLogo from "../assets/icons/december.svg";

export default function Sider() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

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
    getItem("계좌 목록", "account_list", <AccountBookOutlined />, [
      getItem("투자 계좌", "account_detail", <StockOutlined />),
    ]),
    getItem("사용자", "user_list", <UserOutlined />),
    getItem("로그아웃", "logout", <LogoutOutlined />),
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
  min-height: 100vh;
`;
