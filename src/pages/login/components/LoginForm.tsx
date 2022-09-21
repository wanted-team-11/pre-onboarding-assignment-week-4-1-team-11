import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../../../services/api/auth";
import { LoginProps } from "../../../services/model/auth";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = (values: LoginProps) => {
    console.log("Success:", values);
    fetchLogin(values);
    navigate("/admin");
  };

  return (
    <Form name="basic" onFinish={handleLogin}>
      <Form.Item
        label="Username"
        name="email"
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
