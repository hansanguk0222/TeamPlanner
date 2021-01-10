import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from '@/config';
import { ERROR_MESSAGE, TIME } from '@/utils/contants';

export const userLogin = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (user.length === 0) {
      res.status(401).json({ message: ERROR_MESSAGE.NOT_EXIST_USER });
      return;
    }
    if (err || user.length === 0) {
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
