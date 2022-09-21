import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sider from "../components/Sider";
import User from "../pages/User";
import AccountList from "./InvestMentList";
import DashBoard from "./DashBoard";
import styled from "styled-components";

const Content = () => {
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
