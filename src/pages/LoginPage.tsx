import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import { Button, Input, Form, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { loginAxios } from "../services/axios.service";

type formParamsType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const onClickSubmit = (values: formParamsType) => {
    console.log(values);
    loginAxios(values).then(() => navigate("/", { replace: true }));
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        title="Login"
        style={{ width: 300, boxShadow: "1px 1px 10px rgba(0,0,0,0.1)" }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onClickSubmit}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              type="email"
              prefix={<UserOutlined />}
              placeholder="아이디를 입력하세요"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="비밀번호를 입력하세요"
            />
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              className="login-form-button"
              icon={<LoginOutlined />}
            >
              로그인
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default LoginPage;
