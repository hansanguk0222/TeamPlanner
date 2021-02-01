import express from 'express';
import * as cardController from './card.controller';
import cardIdRouter from './[cardId]';

const router = express.Router({ mergeParams: true });

router.get('/cardLists/:cardListId', cardController.getCards);
router.post('/cardLists/:cardListId', cardController.createCard);
router.use('/:cardId', cardIdRouter);

export default router;
