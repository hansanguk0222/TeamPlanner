import React from 'react';
import styled, { css } from 'styled-components';
import { Input } from '@/styles/shared';

interface InputProps {
  valid: boolean;
  isNotExistEmail?: boolean | null;
}

export const AuthInput = styled(Input)<InputProps>`
  width: 22rem;
  height: 2rem;
  padding: 5px;
  font-size: ${(props) => props.theme.size.m};
  border: 2px solid ${(props) => props.theme.color.black13};
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.color.black16};
    border-radius: 2px;
  }
  color: ${(props) => props.theme.color.black16};
  ${(props) =>
    (!props.valid || (props.valid && props.isNotExistEmail === false)) &&
    css`
      border: 2px solid ${props.theme.color.red};
      box-shadow: 0px 0px 6px ${props.theme.color.red};
    `}
`;
