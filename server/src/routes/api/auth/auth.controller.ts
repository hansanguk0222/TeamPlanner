import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from '@/config';
import bcrypt from 'bcrypt';
import { verifyRequestData, randomCode, verfiyRefreshToken } from '@/utils/utils';
import { ERROR_MESSAGE, TIME } from '@/utils/contants';
import { userModel } from '@/models';
import nodemailer from 'nodemailer';

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
    req.login(user, { session: false }, async (err) => {
      if (err) {
        next(err);
      }

      const { pw, ...claims } = user;

      const accessToken = jwt.sign({ user: claims }, config.jwtSecret, { expiresIn: TIME.FIVE_MINUTE });
      const refreshToken = jwt.sign({ user: claims }, config.jwtRefreshSecret, {
        expiresIn: TIME.TWO_MONTH,
      });

      try {
        await userModel.setRefreshToken({ id: +user.id, refreshToken });

        res.cookie('refreshTokenKey', user.id, {
          maxAge: TIME.TWO_MONTH * 1000,
          httpOnly: true,
        });
        res.json({ userId: user.id, accessToken });
        return;
      } catch (err) {
        next(err);
      }
    });
  })(req, res);
};

export const userLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { refreshTokenKey } = req.cookies;
  if (verifyRequestData([refreshTokenKey])) {
    try {
      await userModel.logout({ id: refreshTokenKey });
      res.clearCookie('refreshTokenKey');
      res.status(200).end();
      return;
    } catch (err) {
      res.status(400).json({ message: ERROR_MESSAGE.LOGOUT_FAIL });
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

export const userJoin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, pw, nickname } = req.body;
  const profileImage =
    'https://raw.githubusercontent.com/hansanguk0222/TeamPlanner/714017e2a64893b802db2199d883733d22dff806/server/src/lib/defaultImage/defaultUser.svg';
  if (verifyRequestData([email, pw, nickname])) {
    try {
      const hashPw = await bcrypt.hash(pw, 10);
      await userModel.signUp({ email, pw: hashPw, nickname, profileImage });
      res.status(201).end();
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

export const isExistUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.body;
  if (verifyRequestData([email])) {
    try {
      const [user] = await userModel.isExistEmail({ email });
      if (user.length === 0) {
        res.status(200).end();
        return;
      }
      res.status(400).json({ message: ERROR_MESSAGE.OVERLAP_EMAIL });
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

export const sendEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.body;
  try {
    const authorizeCode = randomCode();
    const message = {
      from: process.env.NODE_MAILER_EMAIL,
      to: email,
      subject: `팀 플레너 인증코드입니다.`,
      html: `<p>인증코드는 ${authorizeCode}입니다.</p>`,
    };
    const transporter = nodemailer.createTransport(config.mail);
    await transporter.sendMail(message);
    res.status(200).json({ authorizeCode });
    return;
  } catch (err) {
    next(err);
  }
};

export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { refreshTokenKey } = req.cookies;
  try {
    const [[result]] = await userModel.getRefreshToken({ id: +refreshTokenKey });
    const { refreshToken } = result;
    const decoded = await verfiyRefreshToken({ refreshToken });
    const { iat, exp, ...claims } = decoded;
    const accessToken = jwt.sign({ user: claims }, config.jwtSecret, { expiresIn: TIME.FIVE_MINUTE });
    res.status(200).json({ userId: claims.user.id, accessToken });
  } catch (err) {
    res.status(401).json({ message: ERROR_MESSAGE.INVALID_TOKEN });
    next(err);
  }
};

export const googleLogin = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('google', { session: false }, (err, user) => {
    if (!user) {
      res.status(401).json({ message: ERROR_MESSAGE.NOT_EXIST_USER });
      return;
    }
    if (err) {
      res.status(400).json({ message: ERROR_MESSAGE.NOT_EXIST_USER });
      return;
    }
    req.login(user, { session: false }, async (err) => {
      if (err) {
        next(err);
      }

      const accessToken = jwt.sign({ user }, config.jwtSecret, { expiresIn: TIME.FIVE_MINUTE });
      const refreshToken = jwt.sign({ user }, config.jwtRefreshSecret, {
        expiresIn: TIME.TWO_MONTH,
      });

      try {
        await userModel.setRefreshToken({ id: +user.id, refreshToken });

        res.cookie('refreshTokenKey', user.id, {
          maxAge: TIME.TWO_MONTH * 1000,
          httpOnly: true,
        });
        res.json({ user, accessToken });
        return;
      } catch (err) {
        next(err);
      }
    });
  })(req, res);
};
