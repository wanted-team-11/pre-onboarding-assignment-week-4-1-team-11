import React from "react";
import LoginForm from "./components/LoginForm";
import styled from "styled-components";

const Login: React.FC = () => {
  return (
    <>
      <Container>
        <h1>Login</h1>
        <LoginForm />
      </Container>
    </>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`;
