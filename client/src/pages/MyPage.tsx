import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Header from '@/components/Common/Header/Header';
import LeftSideBar from '@/components/Common/LeftSideBar/LeftSideBar';
import { isAccessTokenAlive } from '@/utils/utils';

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const MainContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MyPage = () => {
  const history = useHistory();

  useEffect(() => {
    if (!isAccessTokenAlive()) {
      history.push('/login');
    }
  }, []);

  return (
    <>
      <Container>
        <LeftSideBar
          myPage
          items={[
            { name: '참여한 팀', id: 0, check: true },
            { name: '모든 팀 정보', id: 1, check: false },
          ]}
        />
        <MainContentBox>
          <Header />
        </MainContentBox>
      </Container>
    </>
  );
};

export default MyPage;
