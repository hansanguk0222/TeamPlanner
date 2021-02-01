import jwt from 'jsonwebtoken';
import config from '@/config';

export const isValidLoginEmail = ({
  setEmailValidCheck,
  email,
}: {
  setEmailValidCheck: (emailValidCheck: boolean) => void;
  email: string;
}): boolean => {
  const regex = /^[0-9a-zA-Z]*\@[0-9a-zA-Z]*\.(com|net|co.kr)$/i;
  if (email !== '' && regex.test(email)) {
    setEmailValidCheck(true);
    return true;
  }
  setEmailValidCheck(false);
  return false;
};

export const isValidSignupEmail = ({
  setEmailValidCheck,
  setEmailCode,
  setEmailCodeSameCheck,
  email,
}: {
  setEmailValidCheck: (emailValidCheck: boolean) => void;
  setEmailCode: (emailCode: string) => void;
  setEmailCodeSameCheck: (emailcodeSameCheck: boolean) => void;
  email: string;
}): boolean => {
  setEmailCode('');
  setEmailCodeSameCheck(false);
  const regex = /^[0-9a-zA-Z]*\@[0-9a-zA-Z]*\.(com|net|co.kr)$/i;
  if (email !== '' && regex.test(email)) {
    setEmailValidCheck(true);
    return true;
  }
  setEmailValidCheck(false);
  return false;
};

export const isValidLoginPw = ({ setPwValidCheck, pw }: { setPwValidCheck: (pwValidCheck: boolean) => void; pw: string }): boolean => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  if (pw !== '' && regex.test(pw)) {
    setPwValidCheck(true);
    return true;
  }
  setPwValidCheck(false);
  return false;
};

export const isValidSignupPw = ({
  setPwValidCheck,
  setCheckPw,
  setPwSameCheck,
  pw,
}: {
  setPwValidCheck: (pwValidCheck: boolean) => void;
  setCheckPw: (checkPw: string) => void;
  setPwSameCheck: (pwSameCheck: boolean) => void;
  pw: string;
}): boolean => {
  setCheckPw('');
  setPwSameCheck(false);
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  if (pw !== '' && regex.test(pw)) {
    setPwValidCheck(true);
    return true;
  }
  setPwValidCheck(false);
  return false;
};

export const isValidNickname = ({
  setNicknameValidCheck,
  nickname,
}: {
  setNicknameValidCheck: (pwnNicknameCheck: boolean) => void;
  nickname: string;
}): boolean => {
  if (nickname !== '') {
    setNicknameValidCheck(true);
    return true;
  }
  setNicknameValidCheck(false);
  return false;
};

export const accessTokenVerify = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(decoded);
    });
  });
};

export const isAccessTokenAlive = (): boolean => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return true;
  }
  return false;
};

export const getUserId = (): number | void => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    return +userId;
  }
};
