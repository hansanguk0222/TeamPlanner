import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useAuth from '@/hooks/useAuth';
import useUser from '@/hooks/useUser';
import Popover from '../Popover/Popover';

const Container = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  right: 5%;
  background: ${(props) => props.theme.color.black16};
  border-radius: 3px;
`;
const UserImg = styled.img`
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 3px;
`;

const UserIcon: React.FC = () => {
  const { user } = useUser();
  const ref = useRef<HTMLDivElement>(null);
  const [myInformPopoverVisible, setMyInformPopoverVisible] = useState(false);
  const { onLogoutRequest } = useAuth();

  const handleMyInformPopupVisible = () => {
    setMyInformPopoverVisible((state) => !state);
  };

  const handleLogoutRequest = () => {
    onLogoutRequest();
  };

  return (
    <>
      {myInformPopoverVisible && (
        <Popover
          width={10}
          anchorEl={ref}
          anchorOrigin={{ anchorVertical: 'bottom', anchorHorizontal: 'right' }}
          offset={{ x: 10, y: 5 }}
          transformOrigin={{ transformVertical: 'top', transformHorizontal: 'right' }}
          visible={myInformPopoverVisible}
          setVisible={setMyInformPopoverVisible}
          popoverItems={[{ name: '내 정보 보기' }, { name: '로그아웃', callback: handleLogoutRequest }]}
        />
      )}
      <Container ref={ref} onClick={handleMyInformPopupVisible}>
        <UserImg src={user?.profileImage} />
      </Container>
    </>
  );
};

export default UserIcon;
