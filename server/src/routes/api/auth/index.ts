import express from 'express';
import * as authRouter from './auth.controller';

const router = express.Router();

router.post('/login', authRouter.userLogin);
router.post('/join', authRouter.userJoin);
router.post('/email/join', authRouter.isExistUser);
router.post('/email/code', authRouter.sendEmail);
export default router;
