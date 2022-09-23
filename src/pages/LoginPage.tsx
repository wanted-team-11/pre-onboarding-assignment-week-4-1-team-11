import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokenStorage } from "../utils/storages";
import { login } from "../services";
import styled from "styled-components";
import { Card as _Card, Form, Button, Checkbox, Input } from "antd";

interface FormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [formInputs, setFormInputs] = useState<FormInputs>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (tokenStorage.get()) {
      navigate("/");
    }
  }, []);

  const onFinish = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const successful = await login({ email, password });

    if (successful) {
      navigate("/account-list");
    } else {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const onFinishFailed = () => {};
  return (
    <Container>
      <Card title="Login">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              name="email"
              value={formInputs.email}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              name="password"
              value={formInputs.password}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Card = styled(_Card)`
  margin-top: 100px;
`;
