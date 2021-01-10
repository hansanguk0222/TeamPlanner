import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Input, Button } from '@/styles/shared';
import useAuth from '@/hooks/useAuth';
import { ERROR_MESSAGE } from '@/utils/contants';

interface ButtonProps {
  login: boolean;
  possible: boolean;
}

interface InputNameProps {
  email: boolean;
  valid: boolean;
}

interface InputProps {
  valid: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.color.black5};
  color: ${(props) => props.theme.color.black16};
`;

const Content = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginTitle = styled.span`
  margin-bottom: 3rem;
  font-size: ${(props) => props.theme.size.header};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: ${(props) => props.theme.size.m};
  margin-bottom: 1rem;
`;

const InputName = styled.span<InputNameProps>`
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

const LoginInput = styled(Input)<InputProps>`
  width: 20rem;
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

const ButtonBox = styled.div`
  width: 20rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
`;

const LoginButton = styled(Button)<ButtonProps>`
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

const LoginBox = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValidCheck, setEmailValidCheck] = useState(false);
  const [pwValidCheck, setPwValidCheck] = useState(false);
  const [emailFirstClick, setEmailFirstClick] = useState(false);
  const [pwFirstClick, setPwFirstClick] = useState(false);

  const { err, accessToken, onLoginRequest } = useAuth();

  useEffect(() => {
    if (err?.response?.status === 401) {
      alert(ERROR_MESSAGE.NO_EXIST_USER);
    }
  }, [err]);

  const isValidEmail = () => {
    console.log(email);
    const regex = /^[0-9a-zA-Z]*\@[0-9a-zA-Z]*\.(com|net|co.kr)$/i;
    if (email !== '' && regex.test(email)) {
      setEmailValidCheck(true);
      return true;
    }
    setEmailValidCheck(false);
    return false;
  };

  const isValidPw = () => {
    console.log(pw);
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (pw !== '' && regex.test(pw)) {
      setPwValidCheck(true);
      return true;
    }
    setPwValidCheck(false);
    return false;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const isEmailFirstClick = () => {
    if (!emailFirstClick) {
      setEmailFirstClick(true);
    }
  };

  const isPwFirstClick = () => {
    if (!pwFirstClick) {
      setPwFirstClick(true);
    }
  };

  return (
    <Container>
      <Content>
        <LoginTitle>Sign in</LoginTitle>
        <LoginLabel>
          <InputName email valid={!(!emailValidCheck && emailFirstClick)}>
            이메일
          </InputName>
          <LoginInput
            placeholder="email"
            type="text"
            onFocus={isEmailFirstClick}
            onChange={handleEmailChange}
            onKeyUp={isValidEmail}
            value={email}
            autoComplete="false"
            valid={!(!emailValidCheck && emailFirstClick)}
          />
        </LoginLabel>
        <LoginLabel>
          <InputName email={false} valid={!(!pwValidCheck && pwFirstClick)}>
            비밀번호
          </InputName>
          <LoginInput
            placeholder="password"
            type="password"
            onFocus={isPwFirstClick}
            onChange={handlePwChange}
            onKeyUp={isValidPw}
            value={pw}
            autoComplete="false"
            valid={!(!pwValidCheck && pwFirstClick)}
          />
        </LoginLabel>
        <ButtonBox>
          <LoginButton login={false} possible>
            회원가입
          </LoginButton>
          <LoginButton
            login
            disabled={!(pwValidCheck && emailValidCheck)}
            possible={emailValidCheck && pwValidCheck}
            onClick={() => onLoginRequest({ email, pw })}
          >
            로그인
          </LoginButton>
        </ButtonBox>
      </Content>
    </Container>
  );
};

export default LoginBox;
