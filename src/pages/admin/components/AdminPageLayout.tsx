import { LineChartOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Popconfirm } from "antd";
import { Layout, Menu } from "antd";
import { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StorageKey, tokenStorage } from "../../../storage";
import "./index.css";

const { Header, Content, Footer, Sider } = Layout;

const AdminPageLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/admin/user-list">사용자 목록</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<LineChartOutlined />}>
            <Link to="/admin/account-list">계좌 목록</Link>
          </Menu.Item>
          <Divider style={{ backgroundColor: "#424242", height: "1px" }} />
          <Popconfirm
            placement="right"
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
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © December and Company Inc.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminPageLayout;
