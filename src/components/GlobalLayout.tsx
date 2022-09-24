import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { tokenStorage } from "../utils/storages";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { Layout as AntLayout } from "antd";

const { Content } = AntLayout;

const GlobalLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AntLayout>
      <Sidebar />
      <AntLayout>
        <Header />
        <AntContent>
          <Outlet />
        </AntContent>
        <Footer />
      </AntLayout>
    </AntLayout>
  );
};

export default GlobalLayout;

const AntContent = styled(Content)`
  background-color: hsl(216, 20%, 95%);
  min-height: 100vh;
  padding: 20px;
`;
