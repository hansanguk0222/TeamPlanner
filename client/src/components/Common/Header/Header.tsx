import React, { useEffect } from 'react';
import styled from 'styled-components';
import useAuth from '@/hooks/useAuth';
import UserIcon from '../UserIcon/UserIcon';

const Container = styled.h1`
  font-size: ${(props) => props.theme.size.xxxl};
  width: 100%;
  min-height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: ${(props) => props.theme.color.black16};
`;

const Header = () => {
  const { logoutStatus, logoutErr } = useAuth();
  useEffect(() => {
    if (logoutStatus !== null) {
      if (logoutStatus === 200) {
        window.location.href = '/login';
      } else {
        alert(logoutErr?.response?.data);
      }
    }
  }, [logoutStatus, logoutErr]);
  return (
    <>
      <Container>
        TeamPlanner
        <UserIcon />
      </Container>
    </>
  );
};
export default Header;
