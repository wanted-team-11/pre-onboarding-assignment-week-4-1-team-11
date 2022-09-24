import LoginForm from "./components/LoginForm";
import styled from "styled-components";
import { Card } from "antd";

const LoginPage = () => {
  return (
    <>
      <Container>
        <Card title="Login">
          <LoginForm />
        </Card>
      </Container>
    </>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;
