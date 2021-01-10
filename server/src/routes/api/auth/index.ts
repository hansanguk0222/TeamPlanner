import express from 'express';
import * as authRouter from './auth.controller';

const router = express.Router();

router.post('/login', authRouter.userLogin);

export default router;
