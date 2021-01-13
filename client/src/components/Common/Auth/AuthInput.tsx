import React from 'react';
import styled, { css } from 'styled-components';
import { Input } from '@/styles/shared';

interface InputProps {
  valid: boolean;
}

export const AuthInput = styled(Input)<InputProps>`
  width: 22rem;
  padding: 5px;
  font-size: ${(props) => props.theme.size.l};
  border: 2px solid ${(props) => props.theme.color.black13};
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.color.black16};
    border-radius: 2px;
  }
  color: ${(props) => props.theme.color.black16};
  ${(props) =>
    !props.valid &&
    css`
      border: 2px solid ${props.theme.color.red};
      box-shadow: 0px 0px 6px ${props.theme.color.red};
    `}
`;
