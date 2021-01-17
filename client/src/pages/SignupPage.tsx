import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SignupBox from '@/components/SignupBox/SignupBox';
import { isAccessTokenAlive } from '@/utils/utils';

const SignupPage = () => {
  const history = useHistory();

  useEffect(() => {
    if (isAccessTokenAlive()) {
      history.push('/');
    }
  }, []);
  return <SignupBox />;
};

export default SignupPage;
