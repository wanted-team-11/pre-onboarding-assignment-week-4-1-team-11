import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import { Button, Input, Form, Row, Col } from "antd";
import { ChangeEvent } from "react";
type formParamsType = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {};
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {};
  const onClickSubmit = (values: formParamsType) => {
    console.log(values);
  };
  return (
    <div>
      <Row justify="center" align="middle">
        <Col span={4}>
          <Form
            style={{ width: 300 }}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onClickSubmit}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                type="email"
                prefix={<UserOutlined />}
                placeholder="아이디를 입력하세요"
                onChange={onChangeEmail}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="비밀번호를 입력하세요"
                onChange={onChangePassword}
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
        </Col>
      </Row>
    </div>
  );
};
export default LoginPage;
