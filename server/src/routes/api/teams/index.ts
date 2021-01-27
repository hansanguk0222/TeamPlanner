import express from 'express';
import * as teamController from './team.controller';

const router = express.Router({ mergeParams: true });

router.get('/', teamController.getTeamList);
router.get('/users/:userId');
// router.use('/:teamId');

export default router;
