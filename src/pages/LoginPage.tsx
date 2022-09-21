import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokenStorage } from "../utils/storages";
import styled from "styled-components";
import { Card as _Card, Form, Button, Checkbox, Input } from "antd";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenStorage.get()) {
      navigate("/");
    }
  }, []);

  const onFinish = () => {};

  const onFinishFailed = () => {};
  return (
    <Container>
      <Card title="Login">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
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
