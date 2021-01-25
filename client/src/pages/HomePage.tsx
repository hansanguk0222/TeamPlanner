import React from 'react';
import { Redirect } from 'react-router-dom';
import { isAccessTokenAlive } from '@/utils/utils';

const HomePage = () => {
  if (isAccessTokenAlive()) {
    return <Redirect to="/mypage" />;
  }
  return <Redirect to="/login" />;
};

export default HomePage;
