import React from 'react';
import styled from 'styled-components';

export const AuthContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.color.black5};
  color: ${(props) => props.theme.color.black16};
`;
