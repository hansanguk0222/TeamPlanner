import express from 'express';
import userIdRouter from './[userId]';

const router = express.Router({ mergeParams: true });

router.use('/:userId', userIdRouter);

export default router;
