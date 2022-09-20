import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/Auth/AuthForm';
import storage from '../../storage/index';

const Login = () => {
  const navigate = useNavigate();
  const token = storage.get('accessToken');

  useEffect(() => {
    token && navigate('/content');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <AuthForm />;
};

export default Login;
