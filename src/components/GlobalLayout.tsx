import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { tokenStorage } from "../utils/storages";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { Layout as AntLayout } from "antd";

const { Content: _Content } = AntLayout;

const GlobalLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      navigate("/login");
    }
  }, []);
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

const AntContent = styled(_Content)`
  background-color: #f0f2f5;
  min-height: 100vh;
  padding: 30px;
`;
