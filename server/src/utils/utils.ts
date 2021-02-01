import config from '@/config';
import jwt from 'jsonwebtoken';

export const verifyRequestData = (arr: any[]): boolean =>
  arr.every((ele) => {
    return ele !== undefined && ele !== null;
  });

export const randomCode = (): string => {
  const charecters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 8; i += 1) {
    code += charecters[Math.floor(Math.random() * charecters.length)];
  }
  return code;
};

export const verfiyRefreshToken = ({ refreshToken }: { refreshToken: string }): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, config.jwtRefreshSecret, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }

      if (decoded) {
        resolve(decoded);
      }
    });
  });
};
