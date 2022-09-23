import {
  DashboardOutlined,
  UserOutlined,
  BankOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, PageHeader, Typography } from "antd";
import "antd/dist/antd.min.css";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import DashBoardPage from "./DashBoardPage";
import UserInfoPage from "./UserInfoPage";
import AccounstTablePage from "./AccounstTablePage";
import storage from "../utils/storage";
import UsersTablePage from "./UsersTablePage";
import CommonLayOut from "../components/Layout/UserLayOut";

const { Content, Footer, Sider } = Layout;
const { Text } = Typography;

const items: MenuProps["items"] = [
  {
    label: <NavLink to="/">대시보드</NavLink>,
    key: "/",
    icon: <DashboardOutlined />,
  },
  {
    label: <NavLink to="/user/users">사용자</NavLink>,
    key: "/user/users",
    icon: <UserOutlined />,
  },
  {
    label: <NavLink to="/account/accounts">계좌</NavLink>,
    key: "/account/accounts",
    icon: <BankOutlined />,
  },
  {
    label: "로그아웃",
    key: "/logout",
    icon: <LogoutOutlined />,
  },
];
const MainPage = () => {
  const userName = storage.get("USER");
  const location = useLocation();
  const navigate = useNavigate();
  const onClickMenuButton: MenuProps["onClick"] = (e) => {
    if (e.key === "/logout") {
      storage.reset("TOKEN");
      storage.reset("USER");
      navigate("/login", { replace: true });
    }
  };
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" />
        <Menu
          onClick={onClickMenuButton}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[String(location.pathname)]}
          items={items}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <PageHeader
          className="site-layout-background"
          style={{ padding: 14 }}
          extra={[
            <Text type="secondary" key={`user-name-key`}>
              <Text strong>{userName?.split("@")[0]}</Text>님 반갑습니다.
            </Text>,
          ]}
        />

        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Routes>
            <Route path="/" element={<DashBoardPage />} />
            <Route path="user" element={<CommonLayOut />}>
              <Route path="users" element={<UsersTablePage />} />
              <Route path="users/:id" element={<UserInfoPage />} />
            </Route>
            <Route path="account" element={<CommonLayOut />}>
              <Route path="accounts" element={<AccounstTablePage />} />
            </Route>
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © December and Company Inc.
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainPage;
