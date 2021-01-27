import passport from 'passport';
import { ERROR_MESSAGE } from '@/utils/contants';
import { Request, Response, NextFunction } from 'express';

export const authorizedCheck = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      next(err);
      return;
    }

    if (!user) {
      res.status(401).json({ message: ERROR_MESSAGE.INVALID_TOKEN });
      return;
    }

    next();
  })(req, res);
};
