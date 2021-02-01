import express from 'express';
import * as userIdController from './userId.controller';

const router = express.Router({ mergeParams: true });

router.get('/', userIdController.getUser);
router.post('/profile', userIdController.updateUserProfile);

export default router;
