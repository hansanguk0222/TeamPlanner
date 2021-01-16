import express from 'express';
import * as cardListsController from './cardLists.controller';
import cardListIdRouter from './[cardListId]';

const router = express.Router({ mergeParams: true });

router.get('/team/:teamId', cardListsController.getCardLists);
router.post('/team/:teamId', cardListsController.createCardList);
router.use('/:cardListId', cardListIdRouter);
export default router;
