export const isValidEmail = ({ setEmailValidCheck, email }: { setEmailValidCheck: (emailValidCheck: boolean) => void; email: string }) => {
  const regex = /^[0-9a-zA-Z]*\@[0-9a-zA-Z]*\.(com|net|co.kr)$/i;
  if (email !== '' && regex.test(email)) {
    setEmailValidCheck(true);
    return true;
  }
  setEmailValidCheck(false);
  return false;
};

export const isValidPw = ({ setPwValidCheck, pw }: { setPwValidCheck: (pwValidCheck: boolean) => void; pw: string }) => {
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
}) => {
  if (nickname !== '') {
    setNicknameValidCheck(true);
    return true;
  }
  setNicknameValidCheck(false);
  return false;
};
