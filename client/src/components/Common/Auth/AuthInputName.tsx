import React from 'react';
import styled, { css } from 'styled-components';
import { Input } from '@/styles/shared';

interface InputNameProps {
  email: boolean;
  valid: boolean;
}

export const AuthInputName = styled.span<InputNameProps>`
  font-size: ${(props) => props.theme.size.xl};
  margin-bottom: 0.5rem;
  position: relative;
  ${(props) =>
    !props.valid &&
    css`
      &:after {
        content: '${props.email ? '이메일 형식이 잘못되었습니다.' : '비밀번호는 영어, 숫자, 특수문자를 포함한 8자리입니다.'}';
        color: ${props.theme.color.red};
        position: absolute;
        top: 50%;
        right: 0%;
        border-radius: 50%;
        font-size: ${props.theme.size.xxs};
      }
    `}
`;
