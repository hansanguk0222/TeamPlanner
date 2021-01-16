import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@/styles/shared';

interface ButtonProps {
  login: boolean;
  possible: boolean;
}

export const AuthButton = styled(Button)<ButtonProps>`
  background: ${(props) => (props.login ? props.theme.color.green : props.theme.color.purple)};
  width: 8rem;
  color: ${(props) => props.theme.color.black16};
  border-radius: 2px;
  transition: 0.5s;
  ${(props) =>
    props.possible
      ? css`
          &:hover {
            box-shadow: 0px 0px 10px ${props.login ? props.theme.color.green : props.theme.color.purple};
          }
        `
      : css`
          cursor: not-allowed;
        `};
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.color.black16};
    border-radius: 2px;
  }
`;
