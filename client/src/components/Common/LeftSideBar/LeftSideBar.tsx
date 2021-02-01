import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Input } from '@/styles/shared';
import { MagnifyingGlass } from '@/public/svg';
import useUser from '@/hooks/useUser';
import LeftSideBarItem from './LeftSideBarItem/LeftSideBarItem';

const Container = styled.div`
  min-width: 15rem;
  background: ${(props) => props.theme.color.black3};
  display: flex;
  flex-direction: column;
`;

const UpperContainer = styled.div`
  padding: 25px 15px;
`;

const BottomContainer = styled.div``;

const UserWelcomText = styled.span`
  font-size: ${(props) => props.theme.size.s};
  color: ${(props) => props.theme.color.black16};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const FindTeamInput = styled(Input)`
  background: ${(props) => props.theme.color.black10};
  width: 100%;
  color: ${(props) => props.theme.color.black16};
  font-size: ${(props) => props.theme.size.m};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0px 5px 2rem;
`;

const Icon = styled.div`
  position: absolute;
  bottom: -2px;
  left: -2px;
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 10px;
`;

const MakeTeamButton = styled(Button)`
  width: 100%;
  padding: 15px;
  font-size: ${(props) => props.theme.size.xl};
  background: ${(props) => props.theme.color.green};
  color: ${(props) => props.theme.color.black16};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftSideBar: React.FC<{
  isMyPage: boolean;
  items: Array<{ name: string; id: number; check: boolean }>;
  setCreateTeamModalVisible?: (state: boolean) => void;
  setShowJoinedTeamListVisible?: (state: boolean) => void;
}> = ({
  isMyPage,
  items,
  setCreateTeamModalVisible,
  setShowJoinedTeamListVisible,
}: {
  isMyPage: boolean;
  items: Array<{ name: string; id: number; check: boolean }>;
  setCreateTeamModalVisible?: (state: boolean) => void;
  setShowJoinedTeamListVisible?: (state: boolean) => void;
}) => {
  const [sideBarItems, pickSideBarItem] = useState(items);
  const { user } = useUser();

  const handlePickSideBarItem = ({ id, name }: { id: number; name: string }) => {
    const changePickState = sideBarItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          check: true,
        };
      }
      return {
        ...item,
        check: false,
      };
    });

    pickSideBarItem(changePickState);

    if (name === '참여한 팀') {
      if (setShowJoinedTeamListVisible) {
        setShowJoinedTeamListVisible(true);
      }
    } else if (name === '모든 팀 정보') {
      if (setShowJoinedTeamListVisible) {
        setShowJoinedTeamListVisible(false);
      }
    }
  };

  return (
    <Container>
      <UpperContainer>
        <UserWelcomText>{user?.nickname}님 환영합니다.</UserWelcomText>
        {isMyPage && setCreateTeamModalVisible && (
          <>
            <InputBox>
              <Icon>
                <MagnifyingGlass />
              </Icon>
              <FindTeamInput placeholder="팀 이름 검색" />
            </InputBox>
            <MakeTeamButton onClick={() => setCreateTeamModalVisible(true)}>New Team</MakeTeamButton>
          </>
        )}
      </UpperContainer>
      <BottomContainer>
        {sideBarItems.map((item) => (
          <LeftSideBarItem onClick={() => handlePickSideBarItem({ id: item.id, name: item.name })} key={item.id} check={item.check}>
            {item.name}
          </LeftSideBarItem>
        ))}
      </BottomContainer>
    </Container>
  );
};

export default LeftSideBar;
