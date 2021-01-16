import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginBox from '@/components/LoginBox/LoginBox';
import { isAccessTokenAlive } from '@/utils/utils';

const LoginPage = () => {
  const history = useHistory();

  useEffect(() => {
    if (isAccessTokenAlive()) {
      history.push('/');
    }
  }, []);

  return <LoginBox />;
};

export default LoginPage;
