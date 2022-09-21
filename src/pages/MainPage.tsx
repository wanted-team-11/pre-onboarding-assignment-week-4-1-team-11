import {
  DashboardOutlined,
  UserOutlined,
  BankOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import "antd/dist/antd.css";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import DashBoardPage from "./DashBoardPage";
import UserInfoPage from "./UserInfoPage";
import AccountPage from "./AccountPage";
import storage from "../utils/storage";

const { Header, Content, Footer, Sider } = Layout;
const items: MenuProps["items"] = [
  {
    label: <NavLink to="/">대시보드</NavLink>,
    key: "/",
    icon: <DashboardOutlined />,
  },
  {
    label: <NavLink to="/user">사용자</NavLink>,
    key: "/user",
    icon: <UserOutlined />,
  },
  {
    label: <NavLink to="/account">계좌</NavLink>,
    key: "/account",
    icon: <BankOutlined />,
  },
  {
    label: "로그아웃",
    key: "/logout",
    icon: <LogoutOutlined />,
  },
];
const MainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const onClickMenuButton: MenuProps["onClick"] = (e) => {
    if (e.key === "/logout") {
      storage.set({ key: "TOKEN", value: "dd" });
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
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Routes>
            <Route path="/" element={<DashBoardPage />} />
            <Route path="user" element={<UserInfoPage />} />
            <Route path="account" element={<AccountPage />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainPage;
