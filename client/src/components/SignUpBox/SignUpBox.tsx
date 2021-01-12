import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAuth from '@/hooks/useAuth';
import { ERROR_MESSAGE } from '@/utils/contants';
import { AuthButton, AuthInput, AuthContainer, AuthContent, AuthTitle, AuthLabel, AuthInputName } from '../Common/Auth';

const JoinBox = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');
  const [emailValidCheck, setEmailValidCheck] = useState(false);
  const [pwValidCheck, setPwValidCheck] = useState(false);
  const [nicknameValidCheck, setNicknameValidCheck] = useState(false);
  const [emailFirstClick, setEmailFirstClick] = useState(false);
  const [pwFirstClick, setPwFirstClick] = useState(false);
  const [nicknameFirstClick, setNicknameFirstClick] = useState(false);

  const { err, accessToken, onLoginRequest } = useAuth();

  useEffect(() => {
    if (err?.response?.status === 401) {
      alert(ERROR_MESSAGE.NO_EXIST_USER);
    }
  }, [err]);

  const isValidEmail = () => {
    const regex = /^[0-9a-zA-Z]*\@[0-9a-zA-Z]*\.(com|net|co.kr)$/i;
    if (email !== '' && regex.test(email)) {
      setEmailValidCheck(true);
      return true;
    }
    setEmailValidCheck(false);
    return false;
  };

  const isValidPw = () => {
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
    <AuthContainer>
      <AuthContent>
        <AuthTitle>Sign in</AuthTitle>
        <AuthLabel>
          <AuthInputName email valid={!(!emailValidCheck && emailFirstClick)}>
            이메일
          </AuthInputName>
          <AuthInput
            placeholder="email"
            type="text"
            onFocus={isEmailFirstClick}
            onChange={handleEmailChange}
            onKeyUp={isValidEmail}
            value={email}
            autoComplete="false"
            valid={!(!emailValidCheck && emailFirstClick)}
          />
        </AuthLabel>
        <AuthLabel>
          <AuthInputName email={false} valid={!(!pwValidCheck && pwFirstClick)}>
            비밀번호
          </AuthInputName>
          <AuthInput
            placeholder="password"
            type="password"
            onFocus={isPwFirstClick}
            onChange={handlePwChange}
            onKeyUp={isValidPw}
            value={pw}
            autoComplete="false"
            valid={!(!pwValidCheck && pwFirstClick)}
          />
        </AuthLabel>
        <AuthLabel>
          <AuthInputName email valid>
            닉네임
          </AuthInputName>
          <AuthInput
            placeholder="email"
            type="text"
            onFocus={isPwFirstClick}
            onChange={handlePwChange}
            onKeyUp={isValidPw}
            value={pw}
            autoComplete="false"
            valid={!(!pwValidCheck && pwFirstClick)}
          />
        </AuthLabel>
        <AuthButton login={false} possible>
          회원가입
        </AuthButton>
      </AuthContent>
    </AuthContainer>
  );
};
