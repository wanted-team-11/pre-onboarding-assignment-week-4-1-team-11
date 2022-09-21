import axios from "axios";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  //     querySubmit.mutate(email, password);
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
      <BackGround>
        <div
          style={{ marginBottom: "20px", fontWeight: "600", fontSize: "30px" }}
        >
          로그인
        </div>
        <Title title="로그인" className="loginMt" />
        <form onSubmit={onSubmit}>
          <FormBox className="formbox">
            <div>이메일</div>
            <TextField onChange={onChangeEmail} />
            {email.length > 0 && <TextP>{emailMessage}</TextP>}
          </FormBox>
          <FormBox className="formbox">
            <div>비밀번호</div>
            <TextField
              onChange={onChangePassword}
              title="비밀번호"
              type="password"
            />
            {password.length > 0 && (
              <TextP className={`message ${isPassword ? "success" : "error"}`}>
                {passwordMessage}
              </TextP>
            )}
          </FormBox>

          {/* 이름, 이메일, 패스워드, 패스워드 확인이 다 맞다면 주황버튼으로 */}
          <div>
            <section>
              <FootButton type="submit" disabled={!(isEmail && isPassword)}>
                로그인
              </FootButton>
            </section>
          </div>
        </form>
      </BackGround>
    </>
  );
};

export default Login;

const BackGround = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 200px;
`;

const Title = styled.div``;
const TextField = styled.input`
  width: 200px;
  height: 30px;
  padding: 5px;
  box-sizing: border-box;
  font-size: 15px;
`;

const FootButton = styled.button`
  width: 100px;
  height: 50px;
  margin-left: 5px;
`;

const TextP = styled.p`
  font-size: 15px;
  margin-top: 0px;
`;
const FormBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  font-size: 15px;
`;
