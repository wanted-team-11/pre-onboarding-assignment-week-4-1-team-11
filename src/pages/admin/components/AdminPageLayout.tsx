import { LineChartOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Popconfirm } from "antd";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../../router/Router";
import { StorageKey, tokenStorage } from "../../../storage";
import "./index.css";

const { Header, Content, Footer, Sider } = Layout;

const AdminPageLayout = () => {
  const menuItems = [
    {
      key: "user-list",
      icon: <UserOutlined />,
      label: <Link to={PATH.USER_LIST()}>사용자 목록</Link>,
    },
    {
      key: "account-list",
      icon: <LineChartOutlined />,
      label: <Link to={PATH.ACCOUNT_LIST()}>계좌목록</Link>,
    },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const selectedMenu = menuItems.find(({ key }) => pathname.includes(key))?.key;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[selectedMenu || "user-list"]}
          mode="inline"
          items={menuItems}
        />
        <Divider style={{ backgroundColor: "#424242", height: "1px" }} />
        <Popconfirm
          placement="top"
          title={"로그아웃 하시겠습니까?"}
          onConfirm={() => {
            tokenStorage.remove(StorageKey.ACCESS_TOKEN);
            navigate("/");
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button style={{ width: "100%" }} type="link" danger>
            로그아웃
          </Button>
        </Popconfirm>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © December and Company Inc.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminPageLayout;
