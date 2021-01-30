import express from 'express';
import * as teamController from './team.controller';
import teamIdRouter from './[teamId]';

const router = express.Router({ mergeParams: true });

router.get('/', teamController.getTeamList);
router.use('/:teamId', teamIdRouter);

export default router;
