import { useCreateQuery } from "../../../services/hooks/useCreateUser";
import { Drawer, Input as _Input, Button, Modal, Form } from "antd";
import styled from "styled-components";
import { SignupFormProps, SignupProps } from "../../../services/models/auth";

interface NewUserDrawerProps {
  closeDrawer: () => void;
  open: boolean;
}

const NewUserDrawer = ({ closeDrawer, open }: NewUserDrawerProps) => {
  const successfulModal = () => {
    Modal.success({
      title: "신규 사용자 등록 완료",
      content: "신규 사용자 등록이 완료되었습니다.",
      onOk: () => closeDrawer(),
    });
  };

  const { createUserQuery } = useCreateQuery(successfulModal);

  const handleSignup = async (values: SignupProps) => {
    createUserQuery(values);
  };

  const createNewUser = (value: SignupFormProps) => {
    const { email, password } = value;
    Modal.confirm({
      title: "신규 사용자 등록",
      content: "신규 사용자를 등록하시겠습니까?",
      onOk: () => handleSignup({ email, password }),
    });
  };

  return (
    <Drawer
      title="신규 사용자"
      placement="right"
      onClose={closeDrawer}
      open={open}
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={createNewUser}
        autoComplete="off"
      >
        <Form.Item
          label="이메일"
          name="email"
          rules={[
            { required: true, message: "이메일을 작성해주세요" },
            { type: "email", message: "올바른 이메일을 작성해주세요" },
          ]}
        >
          <Input placeholder="email@example.com" />
        </Form.Item>

        <Form.Item
          label="P/W"
          name="password"
          rules={[{ required: true, message: "비밀번호를 작성해주세요" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="P/W 확인"
          name="confirm"
          rules={[
            { required: true, message: "비밀번호를 확인해주세요" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("비밀번호가 일치하지 않습니다.")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default NewUserDrawer;

const Input = styled(_Input)`
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
