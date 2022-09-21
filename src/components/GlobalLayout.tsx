import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { Layout, Menu } from "antd";

const { Content: _Content } = Layout;

const GlobalLayout = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header />
        <Content>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default GlobalLayout;

// const Footer = styled(_Footer)`
//   background-color: white;
// `;
const Content = styled(_Content)`
  background-color: #f0f2f5;
  min-height: 100vh;
  padding: 30px;
`;

const StyledMenu = styled(Menu)`
  margin-top: 20px;
  width: 100%;
`;
