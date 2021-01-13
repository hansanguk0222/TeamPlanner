import React from 'react';
import styled, { css } from 'styled-components';

const setContent = (type: string): string => {
  console.log(type);
  switch (type) {
    case 'email':
      return '이메일 형식이 잘못되었습니다.';
    case 'password':
      return '비밀번호는 영어, 숫자, 특수문자를 포함한 최소 8자리입니다.';
    case 'nickname':
      return '닉네임은 필수입니다.';
    default:
      return '';
  }
};

interface InputNameProps {
  type: string;
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
        content: '${setContent(props.type)}';
        color: ${props.theme.color.red};
        position: absolute;
        top: 50%;
        right: 0%;
        border-radius: 50%;
        font-size: ${props.theme.size.xxs};
      }
    `}
`;
