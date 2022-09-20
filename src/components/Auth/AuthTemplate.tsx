import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer';

interface Children {
  children: React.ReactNode;
}

const AuthTemplate = ({ children }: Children) => {
  return (
    <AuthTemplateWrapper>
      <AuthTitle>PREFACE</AuthTitle>
      {children}
      <Footer />
    </AuthTemplateWrapper>
  );
};

export default AuthTemplate;

const AuthTemplateWrapper = styled.div`
  width: 500px;
  height: 350px;
  margin: 150px auto 0;
`;

const AuthTitle = styled.div`
  font-family: fantasy;
  text-align: center;
  font-size: 50px;
  text-shadow: 5px 5px rgba(0, 0, 0, 0.2);
  font-weight: bolder;
  margin-bottom: 20px;
`;
