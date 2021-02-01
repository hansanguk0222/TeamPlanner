import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Header from '@/components/Common/Header/Header';
import LeftSideBar from '@/components/Common/LeftSideBar/LeftSideBar';
import TeamListBox from '@/components/TeamListBox/TeamListBox';
import { isAccessTokenAlive } from '@/utils/utils';
import Modal from '@/components/Common/Modal/Modal';
import useUser from '@/hooks/useUser';
import CreateTeamModal from '@/components/Common/Modal/CreateTeamModal/CreateTeamModal';

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

const MyPage = () => {
  const history = useHistory();
  const [createTeamModalVisible, setCreateTeamModalVisible] = useState(false);
  const [showJoinedTeamListVisible, setShowJoinedTeamListVisible] = useState(true);
  const { onGetUserRequest } = useUser();

  useEffect(() => {
    if (!isAccessTokenAlive()) {
      history.push('/login');
    }
    onGetUserRequest();
  }, []);

  return (
    <>
      {createTeamModalVisible && (
        <Modal visible={createTeamModalVisible} setVisible={setCreateTeamModalVisible} modalHeader="New Team">
          <CreateTeamModal setCreateTeamModalVisible={setCreateTeamModalVisible} />
        </Modal>
      )}
      <Container>
        <LeftSideBar
          isMyPage
          items={[
            { name: '참여한 팀', id: 0, check: true },
            { name: '모든 팀 정보', id: 1, check: false },
          ]}
          setCreateTeamModalVisible={setCreateTeamModalVisible}
          setShowJoinedTeamListVisible={setShowJoinedTeamListVisible}
        />
        <MainContentBox>
          <Header />
          <TeamListBox showJoinedTeamListVisible={showJoinedTeamListVisible} />
        </MainContentBox>
      </Container>
    </>
  );
};

export default MyPage;
