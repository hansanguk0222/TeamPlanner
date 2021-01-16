import express from 'express';
import * as cardController from './card.controller';
import cardIdRouter from './[cardId]';

const router = express.Router({ mergeParams: true });

router.get('/cardList/:cardListId', cardController.getCards);
router.post('/cardList/:cardListId', cardController.createCard);
router.use('/:cardId', cardIdRouter);

export default router;
