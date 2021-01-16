import express from 'express';
import * as cardIdController from './cardId.controller';

const router = express.Router({ mergeParams: true });

router.post('/order', cardIdController.updateCardOrder);
router.delete('/', cardIdController.deleteCard);
router.post('/content', cardIdController.updateCardContent);

export default router;
