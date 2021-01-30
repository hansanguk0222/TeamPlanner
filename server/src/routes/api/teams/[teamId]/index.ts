import express from 'express';
import * as teamIdRouter from './teamId.controller';

const router = express.Router({ mergeParams: true });

router.get('/authentication/users/:userId', teamIdRouter.isJoinedUser);
export default router;
