import React from "react";
import styled from "styled-components";
import { BiUser, BiLock, BiLogIn, BiCopyright } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const LoginClick = () => {
    navigate("/content");
  };
  return (
    <LoginContainer>
      <TitleBox>
        <LoginTitle>PREFACE</LoginTitle>
      </TitleBox>
      <LoginBox>
        <LoginBanner>
          <BiUser /> 로그인
        </LoginBanner>
        <InputBox>
          <ImageBox>
            <LoginInput type="text" placeholder="이메일 로그인 부탁" />
            <UserImage />
          </ImageBox>
          <ImageBox>
            <PasswordInput type="password" placeholder="패스워드" />
            <LockImage />
          </ImageBox>

          <LoginButton onClick={LoginClick}>
            <LoginImage /> 로그인
          </LoginButton>
        </InputBox>
      </LoginBox>
      <Corporation>
        <BiCopyright /> December and Company
      </Corporation>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoginBox = styled.div`
  width: 450px;
  height: 350px;
  background-color: white;
  box-shadow: 3px 3px 3px grey;
  border: 1px solid black;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 150px;
`;

const LoginTitle = styled.div`
  font-size: 60px;
`;

const LoginBanner = styled.div`
  background-color: #fafafa;
  height: 30px;
  padding: 20px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const LoginInput = styled.input`
  width: 370px;
  height: 40px;

  font-size: 20px;
  padding-left: 30px;
`;
const PasswordInput = styled(LoginInput)``;

const LoginButton = styled.button`
  width: 370px;
  height: 40px;
  margin-top: 30px;
  font-size: 20px;
  color: grey;
  &:hover {
    background-color: #468ff7;
    color: white;
  }
`;

const ImageBox = styled.div`
  position: relative;
  padding: 15px 0;
`;
const LockImage = styled(BiLock)`
  position: absolute;
  margin-top: -10px;
  left: 5px;
  top: 50%;
  z-index: 3;
  width: 20px;
  height: 20px;
`;

const UserImage = styled(BiUser)`
  margin-top: -10px;
  left: 5px;
  top: 50%;
  position: absolute;
  z-index: 3;
  width: 20px;
  height: 20px;
`;

const LoginImage = styled(BiLogIn)`
  width: 20px;
  height: 20px;
`;

const Corporation = styled.div`
  margin-top: 20px;
  font-size: 15px;
`;
