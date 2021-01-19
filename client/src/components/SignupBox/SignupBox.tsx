import React, { useEffect, useState } from 'react';
import useSignup from '@/hooks/useSignup';
import useInterval from '@/hooks/useInterval';
import { Link, useHistory } from 'react-router-dom';
import { isValidSignupEmail, isValidSignupPw, isValidNickname } from '@/utils/utils';
import styled from 'styled-components';
import { AuthButton, AuthInput, AuthContainer, AuthContent, AuthTitle, AuthLabel, AuthInputName } from '../Common/Auth';

interface EmailAuthorizeStateProps {
  timeout: boolean;
}

const Timer = styled.span`
  width: 22rem;
  font-size: ${(props) => props.theme.size.xs};
  margin-top: -10px;
  margin-bottom: 1rem;
`;

const EmailAuthorizeState = styled.span<EmailAuthorizeStateProps>`
  width: 22rem;
  font-size: ${(props) => props.theme.size.xs};
  margin-top: -10px;
  margin-bottom: 1rem;
  color: ${(props) => (props.timeout ? props.theme.color.red : props.theme.color.black16)};
`;

const SignupBox = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');
  const [checkPw, setCheckPw] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [{ min, sec }, setTime] = useState({
    min: '00',
    sec: '00',
  });
  const [count, setCount] = useState(0);
  const [emailValidCheck, setEmailValidCheck] = useState(false);
  const [pwValidCheck, setPwValidCheck] = useState(false);
  const [nicknameValidCheck, setNicknameValidCheck] = useState(false);
  const [pwSameCheck, setPwSameCheck] = useState(false);
  const [emailCodeSameCheck, setEmailCodeSameCheck] = useState(false);
  const [emailFirstClick, setEmailFirstClick] = useState(false);
  const [pwFirstClick, setPwFirstClick] = useState(false);
  const [nicknameFirstClick, setNicknameFirstClick] = useState(false);
  const [checkPwFirstClick, setCheckPwFirstClick] = useState(false);
  const [emailCodeFirstClick, setEmailCodeFirstClick] = useState(false);

  const history = useHistory();

  const {
    authorizeCode,
    isJoinOk,
    isNotExistEmail,
    onSignUpOverlapEmailInitialize,
    onAuthorizeEmailRequest,
    onJoinRequest,
    onSignUpOverlapEmailRequest,
  } = useSignup();

  useEffect(() => {
    if (isJoinOk) {
      history.push('/login');
    }
  }, [isJoinOk]);

  useInterval(
    () => {
      setCount(count - 1);
    },
    () => {
      setCount(300);
    },
    1000,
    isNotExistEmail,
    count,
  );

  useEffect(() => {
    if (isNotExistEmail) {
      let min = String(Math.floor(count / 60));
      let sec = String(count % 60);
      if (min.length === 1) {
        min = `0${min}`;
      }
      if (sec.length === 1) {
        sec = `0${sec}`;
      }
      setTime({ min, sec });
    }
  }, [isNotExistEmail, count]);

  useEffect(() => {
    if (isNotExistEmail) {
      onAuthorizeEmailRequest({ email });
    }
  }, [isNotExistEmail]);

  useEffect(() => {
    console.log(authorizeCode);
  }, [authorizeCode]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleCheckPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPw(e.target.value);
  };

  const handleEmailCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailCode(e.target.value);
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

  const isNicknameFirstClick = () => {
    if (!nicknameFirstClick) {
      setNicknameFirstClick(true);
    }
  };

  const isCheckPwFirstClick = () => {
    if (!checkPwFirstClick) {
      setCheckPwFirstClick(true);
    }
  };

  const isEmailCodeFirstClick = () => {
    if (!emailCodeFirstClick) {
      setEmailCodeFirstClick(true);
    }
  };

  const isSamePw = () => {
    if (pw === checkPw) {
      setPwSameCheck(true);
      return;
    }
    setPwSameCheck(false);
  };

  const isSameEmailCode = () => {
    if (emailCode === authorizeCode) {
      setEmailCodeSameCheck(true);
      return;
    }
    setEmailCodeSameCheck(false);
  };

  const emailExistAndValidCheck = (): void => {
    if (isValidSignupEmail({ setEmailValidCheck, setEmailCodeSameCheck, setEmailCode, email })) {
      onSignUpOverlapEmailRequest({ email });
      return;
    }
    onSignUpOverlapEmailInitialize();
  };

  const recallEmailAuthorizecode = (): void => {
    onAuthorizeEmailRequest({ email });
    setCount(300);
    setEmailCode('');
  };

  return (
    <AuthContainer>
      <AuthContent>
        <AuthTitle>Sign in</AuthTitle>
        <AuthLabel>
          <AuthInputName type="email" isNotExistEmail={isNotExistEmail} valid={!(!emailValidCheck && emailFirstClick)}>
            이메일
          </AuthInputName>
          <AuthInput
            placeholder="email"
            type="text"
            onFocus={isEmailFirstClick}
            onChange={handleEmailChange}
            onKeyUp={emailExistAndValidCheck}
            value={email}
            autoComplete="false"
            isNotExistEmail={isNotExistEmail}
            valid={!(!emailValidCheck && emailFirstClick)}
          />
        </AuthLabel>
        {isNotExistEmail && emailValidCheck && (
          <>
            <AuthLabel>
              <AuthInputName type="emailCode" valid={!(!emailCodeSameCheck && emailCodeFirstClick)}>
                이메일 인증코드
              </AuthInputName>
              <AuthInput
                placeholder="이메일로 받은 코드를 입력해주세요"
                type="text"
                onFocus={isEmailCodeFirstClick}
                onChange={handleEmailCodeChange}
                onKeyUp={isSameEmailCode}
                value={emailCode}
                autoComplete="false"
                readOnly={emailCodeSameCheck}
                valid={!(!emailCodeSameCheck && emailCodeFirstClick)}
              />
            </AuthLabel>
            {!emailCodeSameCheck && count !== 0 && (
              <Timer>
                {min}:{sec}
              </Timer>
            )}
            {!emailCodeSameCheck && count === 0 && (
              <EmailAuthorizeState timeout onClick={recallEmailAuthorizecode}>
                시간초과 됬습니다. 재인증하려면 여기를 눌러주세요
              </EmailAuthorizeState>
            )}
            {emailCodeSameCheck && <EmailAuthorizeState timeout={false}>이메일 인증 완료!!!</EmailAuthorizeState>}
          </>
        )}
        <AuthLabel>
          <AuthInputName type="password" valid={!(!pwValidCheck && pwFirstClick)}>
            비밀번호
          </AuthInputName>
          <AuthInput
            placeholder="password"
            type="password"
            onFocus={isPwFirstClick}
            onChange={handlePwChange}
            onKeyUp={() => isValidSignupPw({ setPwValidCheck, setCheckPw, setPwSameCheck, pw })}
            value={pw}
            autoComplete="false"
            valid={!(!pwValidCheck && pwFirstClick)}
          />
        </AuthLabel>
        <AuthLabel>
          <AuthInputName type="passwordCheck" valid={!(!pwSameCheck && checkPwFirstClick)}>
            비밀번호 확인
          </AuthInputName>
          <AuthInput
            placeholder="위에 적은 것과 같은 비밀번호를 입력해주세요"
            type="password"
            onFocus={isCheckPwFirstClick}
            onChange={handleCheckPwChange}
            onKeyUp={isSamePw}
            value={checkPw}
            autoComplete="false"
            valid={!(!pwSameCheck && checkPwFirstClick)}
          />
        </AuthLabel>
        <AuthLabel>
          <AuthInputName type="nickname" valid={!(!nicknameValidCheck && nicknameFirstClick)}>
            닉네임
          </AuthInputName>
          <AuthInput
            placeholder="nickname"
            type="text"
            onFocus={isNicknameFirstClick}
            onChange={handleNicknameChange}
            onKeyUp={() => isValidNickname({ setNicknameValidCheck, nickname })}
            value={nickname}
            autoComplete="false"
            valid={!(!nicknameValidCheck && nicknameFirstClick)}
          />
        </AuthLabel>
        <Link to="/login">
          <AuthButton
            onClick={() => onJoinRequest({ email, pw, nickname })}
            login={false}
            disabled={!(pwValidCheck && emailValidCheck && nicknameValidCheck && pwSameCheck && emailCodeSameCheck)}
            possible={nicknameValidCheck && pwValidCheck && emailValidCheck && pwSameCheck && emailCodeSameCheck}
          >
            회원가입
          </AuthButton>
        </Link>
      </AuthContent>
    </AuthContainer>
  );
};

export default SignupBox;
