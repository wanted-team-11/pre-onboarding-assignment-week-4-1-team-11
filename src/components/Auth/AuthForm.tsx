import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthTemplate from './AuthTemplate';
import storage from '../../storage';
import { onLogin } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faLock,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
const AuthForm = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const saveUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const submitUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    try {
      const token = await onLogin(email, password);
      storage.set('accessToken', token);
      navigate('/content');
    } catch (err) {
      alert('로그인에 실패하였습니다.');
      console.error(err);
    }
  };

  return (
    <AuthTemplate>
      <LoginSection>
        <LoginTitle>
          <FontAwesomeIcon icon={faUser} />
          로그인
        </LoginTitle>

        <LoginForm onSubmit={submitUserInfo}>
          <FontAwesomeIcon icon={faUser} />
          <EmailInput
            type="text"
            autoComplete="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            onChange={saveUserValue}
          />
          <FontAwesomeIcon icon={faLock} />
          <PasswordInput
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={saveUserValue}
          />
          <LoginButton>
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            로그인
          </LoginButton>
        </LoginForm>
      </LoginSection>
    </AuthTemplate>
  );
};

export default AuthForm;

const LoginSection = styled.section`
  width: inherit;
  height: calc(100% - 40px);
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LoginTitle = styled.div`
  padding-top: 5px;
  border-radius: 8px 8px 0 0;
  background-color: rgba(211, 211, 211, 0.65);
  display: flex;
  align-items: center;
  width: 500px;
  height: 50px;
  svg {
    width: 16px;
    height: 16px;
    margin: 0 10px 0 50px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  svg {
    position: absolute;
    top: 38%;
    left: 15%;
    cursor: text;
  }
  svg:first-child {
    top: 6%;
  }
  svg:last-child {
    top: 70.5%;
    left: 43%;
  }
`;

const EmailInput = styled.input`
  width: 340px;
  height: 40px;
  margin-bottom: 30px;
  padding-left: 30px;
  font-size: 16px;
  border: 1px solid lightgray;
  border-radius: 8px;
`;

const PasswordInput = styled(EmailInput)``;

const LoginButton = styled.button`
  width: 375px;
  height: 40px;
  margin-bottom: 40px;
  border: 0;
  border-radius: 8px;
  background-color: rgba(81, 95, 234, 1);
  transition: background 0.2s ease;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: rgba(81, 95, 234, 0.3);
    color: rgb(81, 95, 234);
  }
`;
