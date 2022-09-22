import axios from "axios";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import { ReactComponent as MainLogo } from "../assets/icons/december.svg";
import SiderLogo from "../assets/icons/december.svg";
const Login = () => {
  // 이메일, 비밀번호, 비밀번호 확인
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await axios
          .post("/login", {
            password: password,
            email: email,
          })
          .then(
            (res: {
              status: number;
              data: {
                accessToken: string;
                user: { email: string; id: string };
              };
            }) => {
              if (res.status === 200) {
                localStorage.setItem("token", res.data.accessToken);
                localStorage.setItem("useremail", res.data.user.email);
                localStorage.setItem("userId", res.data.user.id);
                navigate("/account_list");
              }
            }
          );
      } catch (err: any) {
        console.error(err);
        alert(`${err.response.data.message}`);
      }
    },
    [email, navigate, password]
  );

  //   const onSubmit = () => {
  //     querySubmit.mutate(email);
  //   };

  //   const querySubmit = useMutation(() => SignApi.LoginApi(email, password), {
  //     onSuccess: (res: {
  //       status: number;
  //       data: { accessToken: string; user: { email: string } };
  //     }) => {
  //       localStorage.setItem("token", res.data.accessToken);
  //       localStorage.setItem("useremail", res.data.user.email);
  //       navigate("/account_list");
  //     },
  //     onError: (err: any) => {
  //       alert(`${err.response.data.message}`);
  //     },
  //   });

  // 이메일
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜㅜ");
        setIsEmail(false);
      } else {
        setEmailMessage("올바른 이메일 형식이에요 :)");
        setIsEmail(true);
      }
    },
    []
  );

  // 비밀번호
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex = /^(?=.*[a-zA-Z]).{6,50}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage("8자리 이상 입력해주세요!");
        setIsPassword(false);
      } else {
        setPasswordMessage("올바른 비밀번호 형식이에요 :)");
        setIsPassword(true);
      }
    },
    []
  );

  return (
    <>
      <LogoBox>
        <MainLogoBox />
      </LogoBox>
      <BackGround>
        <LoginText>
          <UserOutlined />
          로그인
        </LoginText>
        <Title title="로그인" className="loginMt" />
        <form onSubmit={onSubmit}>
          <FormBox className="formbox">
            <TextField
              onChange={onChangeEmail}
              placeholder="이메일을 입력해주세요"
            />
            {email.length > 0 && <TextP>{emailMessage}</TextP>}
          </FormBox>
          <FormBox className="formbox">
            <TextField
              onChange={onChangePassword}
              title="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            {password.length > 0 && (
              <TextP className={`message ${isPassword ? "success" : "error"}`}>
                {passwordMessage}
              </TextP>
            )}
          </FormBox>

          <div>
            <section>
              <FootButton type="submit" disabled={!(isEmail && isPassword)}>
                <ButtonText>
                  <LoginOutlined />
                  로그인
                </ButtonText>
              </FootButton>
            </section>
          </div>
        </form>
      </BackGround>
      <Footer>Copyright © December and Company Inc.</Footer>
    </>
  );
};

export default Login;

const LogoBox = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;
const MainLogoBox = styled(MainLogo)`
  width: 500px;
`;

const BackGround = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: auto;
  border-radius: 20px;
  box-shadow: 3px 3px 3px 3px #999;
  width: 500px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.div`
  padding-top: 20px;
`;

const LoginText = styled.div`
  display: flex;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 20px;
  border: none;
  border-bottom: black 2px solid;
  outline: none;
  gap: 4px;
`;
const TextField = styled.input`
  width: 400px;
  height: 40px;
  padding: 5px;
  box-sizing: border-box;
  font-size: 15px;
  border: none;
  border-bottom: black 2px solid;
  outline: none;
`;

const FootButton = styled.button`
  width: 300px;
  height: 50px;

  margin-top: 40px;
  border-radius: 10px;
  gap: 4px;
`;

const TextP = styled.p`
  display: flex;
  margin-left: 50px;
  font-size: 15px;
  margin-top: 10px;
  color: #ef3061;
`;
const FormBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  font-size: 15px;
`;

const Footer = styled.div`
  margin-top: 50px;
  text-align: center;
`;

const ButtonText = styled.div`
  font-weight: bold;
  gap: 5px;
  display: flex;
  justify-content: center;
`;
