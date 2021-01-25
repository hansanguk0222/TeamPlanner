import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAuth from '@/hooks/useAuth';
import { ERROR_MESSAGE } from '@/utils/contants';
import { Link, useHistory } from 'react-router-dom';
import { isValidLoginEmail, isValidLoginPw } from '@/utils/utils';
import { AuthButton, AuthInput, AuthContainer, AuthContent, AuthTitle, AuthLabel, AuthInputName } from '../Common/Auth';

const ButtonBox = styled.div`
  width: 22rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
`;

const LoginBox = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValidCheck, setEmailValidCheck] = useState(false);
  const [pwValidCheck, setPwValidCheck] = useState(false);
  const [emailFirstClick, setEmailFirstClick] = useState(false);
  const [pwFirstClick, setPwFirstClick] = useState(false);

  const { loginStatus, loginErr, onLoginRequest } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (loginStatus !== null) {
      if (loginStatus === 401) {
        alert(ERROR_MESSAGE.NO_EXIST_USER);
      }
      if (loginStatus === 200) {
        history.push('/');
      }
    }
  }, [loginStatus]);

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
          <AuthInputName type="email" valid={!(!emailValidCheck && emailFirstClick)}>
            이메일
          </AuthInputName>
          <AuthInput
            placeholder="email"
            type="text"
            onFocus={isEmailFirstClick}
            onChange={handleEmailChange}
            onKeyUp={() => isValidLoginEmail({ setEmailValidCheck, email })}
            value={email}
            autoComplete="false"
            valid={!(!emailValidCheck && emailFirstClick)}
          />
        </AuthLabel>
        <AuthLabel>
          <AuthInputName type="password" valid={!(!pwValidCheck && pwFirstClick)}>
            비밀번호
          </AuthInputName>
          <AuthInput
            placeholder="password"
            type="password"
            onFocus={isPwFirstClick}
            onChange={handlePwChange}
            onKeyUp={() => isValidLoginPw({ setPwValidCheck, pw })}
            value={pw}
            autoComplete="false"
            valid={!(!pwValidCheck && pwFirstClick)}
          />
        </AuthLabel>
        <ButtonBox>
          <Link to="/join">
            <AuthButton login={false} possible>
              회원가입
            </AuthButton>
          </Link>
          <AuthButton
            login
            disabled={!(pwValidCheck && emailValidCheck)}
            possible={emailValidCheck && pwValidCheck}
            onClick={() => onLoginRequest({ email, pw })}
          >
            로그인
          </AuthButton>
        </ButtonBox>
      </AuthContent>
    </AuthContainer>
  );
};

export default LoginBox;
