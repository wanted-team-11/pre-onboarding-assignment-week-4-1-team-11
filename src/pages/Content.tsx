import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sider from "../components/Sider";
import User from "../pages/User";
import AccountList from "./InvestMentList";
import DashBoard from "./DashBoard";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { tokenStorage } from "../storage/tokenStorage";
import {useEffect} from "react";


const Content = () => {
  const navigate = useNavigate();
  const token = tokenStorage.get('accessToken');

  useEffect(() => {
    !token && navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
  return (
    <>
      <ContentContainer>
        <Sider />
        <Header />
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/user" element={<User />} />
          <Route path="/accountlist" element={<AccountList />} />
        </Routes>
        <Footer />
      </ContentContainer>
    </>
  );
};

export default Content;

const ContentContainer = styled.div`
  position: relative;
  padding-left: 300px;
  
`;
