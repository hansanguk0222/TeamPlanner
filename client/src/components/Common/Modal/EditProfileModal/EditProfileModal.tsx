import React from 'react';
import styled from 'styled-components';
import { Input } from '@/styles/shared';

const Container = styled.div`
  width: 80%;
  height: 35rem;
  border: 2px solid gold;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfileImg = styled.img`
  width: 80%;
  height: 30rem;
  position: relative;
  &:after {
    content: '프로필 변경';
    top: 0;
    right: 0;
    font-size: ${(props) => props.theme.size.xs};
  }
`;

const NicknameInput = styled.input`
  width: 100%;
  border: ;
`;
