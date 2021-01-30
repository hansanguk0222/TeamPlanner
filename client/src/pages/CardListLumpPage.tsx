import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import Header from '@/components/Common/Header/Header';
import LeftSideBar from '@/components/Common/LeftSideBar/LeftSideBar';
import { isAccessTokenAlive, getUserId } from '@/utils/utils';
import useTeam from '@/hooks/useTeam';
import useUser from '@/hooks/useUser';
import useCardList from '@/hooks/useCardList';
import { URLParmas } from '@/types';
import CardListLumpBox from '@/components/CardListLumpBox/CardListLumpBox';

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const MainContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardListLumpPage = () => {
  const history = useHistory();
  const [createTeamModalVisible, setCreateTeamModalVisible] = useState(false);
  const { onGetUserRequest } = useUser();
  const { onGetCardListLumpRequest } = useCardList();
  const { checkJoinedUserStatus, onCheckJoinedUserRequest } = useTeam();
  const { teamId }: URLParmas = useParams();

  useEffect(() => {
    if (!isAccessTokenAlive()) {
      history.push('/login');
    }
    const userId = getUserId();

    if (teamId && userId) {
      onCheckJoinedUserRequest({ teamId: +teamId, userId: +userId });
    }

    onGetUserRequest();
  }, []);

  useEffect(() => {
    if (checkJoinedUserStatus !== 200 && checkJoinedUserStatus !== null) {
      alert('회원 가입을 하지 않은 팀입니다!!!');
      history.push('/mypage');
    }
    if (teamId) {
      onGetCardListLumpRequest({ teamId: +teamId });
    }
  }, [checkJoinedUserStatus]);

  return (
    <>
      <Container>
        <LeftSideBar
          isMyPage
          items={[
            { name: '작업 기록 보기', id: 0, check: true },
            { name: '새로운 사람 초대하기', id: 1, check: false },
            { name: '팀원 정보보기', id: 2, check: false },
          ]}
          setCreateTeamModalVisible={setCreateTeamModalVisible}
        />
        <MainContentBox>
          <Header />
          <CardListLumpBox />
        </MainContentBox>
      </Container>
    </>
  );
};

export default CardListLumpPage;
