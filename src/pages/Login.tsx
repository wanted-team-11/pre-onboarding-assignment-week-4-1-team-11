import React, { useEffect, useState, ChangeEvent } from "react";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePWInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const { handleLogin } = useAuth({ email, password });

  const [loginValid, setLoginValid] = useState(false);
  const regEmail = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const loginValidation = () => {
    regEmail.test(email) &&
    !/[0-9]/g.test(email.split(".")[1]) &&
    password.length > 3
      ? setLoginValid(true)
      : setLoginValid(false);
  };

  useEffect(loginValidation, [email, password]);

  return (
    <LoginForm
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
    >
      <Title>로그인</Title>
      <FormAlert
        name="email"
        rules={[{ required: true, message: "이메일을 입력하세요!" }]}
      >
        <EmailInput
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={handleEmailInput}
          autoComplete="off"
        />
      </FormAlert>
      <FormAlert
        name="password"
        rules={[
          {
            required: true,
            message: "비밀번호를 입력하세요!",
          },
        ]}
      >
        <PasswordInput
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={handlePWInput}
          autoComplete="off"
        />
      </FormAlert>
      <Form.Item>
        <LoginButton
          onClick={handleLogin}
          type="primary"
          htmlType="submit"
          disabled={!loginValid}
        >
          로그인
        </LoginButton>
      </Form.Item>
    </LoginForm>
  );
}

const LoginForm = styled(Form)`
  width: 400px;
  border: 1px solid lightgray;
  margin: 300px auto;
`;

const Title = styled.div`
  width: 100%;
  background-color: rgb(246, 246, 246);
  padding: 10px;
`;

const FormAlert = styled(Form.Item)`
  margin: 10px 10px;
`;

const EmailInput = styled(Input)`
  width: 380px;
  margin: 10px 0;
`;

const PasswordInput = styled(Input.Password)`
  width: 380px;
  margin: 10px 0;
`;

const LoginButton = styled(Button)`
  width: 380px;
  margin: 10px 10px 0;
`;

export default Login;
