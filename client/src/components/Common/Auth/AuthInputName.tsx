import React from 'react';
import styled, { css } from 'styled-components';

const setContent = (type: string, isNotExistEmail: undefined | boolean | null): string => {
  switch (type) {
    case 'email':
      const message = isNotExistEmail === false ? '이미 존재하는 이메일입니다.' : '이메일 형식이 잘못되었습니다.';
      return message;
    case 'password':
      return '비밀번호는 영어, 숫자, 특수문자를 포함한 최소 8자리입니다.';
    case 'nickname':
      return '닉네임은 필수입니다.';
    case 'passwordCheck':
      return '비밀번호가 일치하지 않습니다.';
    case 'emailCode':
      return '이메일 인증 코드가 맞지 않습니다.';
    default:
      return '';
  }
};

interface InputNameProps {
  type: string;
  valid: boolean;
  isNotExistEmail?: boolean | null;
}

export const AuthInputName = styled.span<InputNameProps>`
  font-size: ${(props) => props.theme.size.xl};
  margin-bottom: 0.5rem;
  position: relative;
  ${(props) =>
    (!props.valid || (props.valid && props.isNotExistEmail === false)) &&
    css`
      &:after {
        content: '${setContent(props.type, props.isNotExistEmail)}';
        color: ${props.theme.color.red};
        position: absolute;
        top: 50%;
        right: 0%;
        border-radius: 50%;
        font-size: ${props.theme.size.xxs};
      }
    `}
`;
