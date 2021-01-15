import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SignUpBox from '@/components/SignUpBox/SignUpBox';
import { isAccessTokenAlive } from '@/utils/utils';

const SignUpPage = () => {
  const history = useHistory();

  useEffect(() => {
    if (isAccessTokenAlive()) {
      history.push('/');
    }
  }, []);
  return <SignUpBox />;
};

export default SignUpPage;
