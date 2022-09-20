import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AccountsList from './components/AccountLists';
import UserList from './components/UserList';
import SideBar from './components/SideBar';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import storage from '../../storage/index';
import UserDetail from './components/UserDetail';

const Content = () => {
  const navigate = useNavigate();
  const token = storage.get('accessToken');

  useEffect(() => {
    !token && navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <ContentWrapper>
      <Header />
      <SideBar />
      <ContentContainer>
        <Routes>
          <Route path="/" element={<AccountsList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id/*" element={<UserDetail />} />
        </Routes>
      </ContentContainer>
      <Footer />
    </ContentWrapper>
  );
};

export default Content;

const ContentWrapper = styled.div`
  margin-left: 300px;
`;

const ContentContainer = styled.section`
  padding: 30px 30px;
  background-color: #eff2f5;
`;
