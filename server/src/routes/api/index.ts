import express from 'express';
import { authorizedCheck } from '@/middleware/auth.middleware';
import cardListRouter from './cardLists';
import cardRouter from './cards';
import userRouter from './users';
import authRouter from './auth';
import teamRouter from './teams';

const router = express.Router();
router.use('/cardLists', authorizedCheck, cardListRouter);
router.use('/cards', authorizedCheck, cardRouter);
router.use('/users', authorizedCheck, userRouter);
router.use('/teams', authorizedCheck, teamRouter);
router.use('/auth', authRouter);
export default router;
