import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from '@/config';
import bcrypt from 'bcrypt';
import { verifyRequestData } from '@/utils/utils';
import { ERROR_MESSAGE, OK_MESSAGE, TIME } from '@/utils/contants';
import { userModel } from '@/models';

export const userLogin = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (!user) {
      res.status(401).json({ message: ERROR_MESSAGE.NOT_EXIST_USER });
      return;
    }
    if (err) {
      res.status(400).json({ message: ERROR_MESSAGE.NOT_EXIST_USER });
      return;
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        next(err);
      }
      const accessToken = jwt.sign({ user }, config.jwtSecret, { expiresIn: TIME.FIVE_MINUTE });
      const refreshToken = jwt.sign({ user }, config.jwtRefreshSecret, {
        expiresIn: TIME.TWO_MONTH,
      });

      res.status(200).json({ user, accessToken, refreshToken });
    });
  })(req, res);
};

export const userJoin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, pw, nickname, profileImage } = req.body;
  if (verifyRequestData([email, pw, nickname, profileImage])) {
    try {
      const hashPw = await bcrypt.hash(pw, 10);
      console.log(hashPw);
      await userModel.signUp({ email, pw: hashPw, nickname, profileImage });
      res.status(200).json({ message: OK_MESSAGE.SIGN_UP_SUCCESS });
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};
