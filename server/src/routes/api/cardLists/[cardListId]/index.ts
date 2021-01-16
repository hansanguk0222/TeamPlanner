import express from 'express';
import * as cardListIdController from './cardListId.controller';

const router = express.Router({ mergeParams: true });

router.delete('/', cardListIdController.deleteCardList);
router.post('/rename', cardListIdController.updateCardListName);

export default router;
