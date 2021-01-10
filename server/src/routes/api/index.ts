import express from 'express';
import passport from 'passport';
import cardListRouter from './cardLists';
import cardRouter from './cards';
import userRouter from './users';
import authRouter from './auth';

const router = express.Router();
router.use('/cardLists', passport.authenticate('jwt', { session: false }), cardListRouter);
router.use('/cards', passport.authenticate('jwt', { session: false }), cardRouter);
router.use('/users', passport.authenticate('jwt', { session: false }), userRouter);
router.use('/auth', authRouter);
export default router;
