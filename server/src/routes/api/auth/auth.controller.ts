import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from '@/config';
import bcrypt from 'bcrypt';
import { verifyRequestData, randomCode } from '@/utils/utils';
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
  const { email, pw, nickname } = req.body;
  let { profileImage } = req.body;
  if (verifyRequestData([email, pw, nickname])) {
    try {
      if (profileImage === undefined) {
        profileImage = 'aaa';
      }
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
