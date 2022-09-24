import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../../../services/api/fetchAuth";
import { LoginProps } from "../../../services/models/auth";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = async (values: LoginProps) => {
    const response = await fetchLogin(values);
    if (response) navigate("/admin");
  };

  return (
    <Form name="login" onFinish={handleLogin} style={{ width: 300 }}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
