import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { ERROR_MESSAGE } from '@/utils/contants';
import { cardModel, cardListModel, teamModel } from '@/models';

export const updateCardOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { cardId } = req.params;
  const { beforeCardListId, nowCardListId, cardOrder, teamId, moveCnt } = req.body;
  if (verifyRequestData([beforeCardListId, nowCardListId, cardOrder, teamId, moveCnt])) {
    try {
      console.log(beforeCardListId, nowCardListId, cardOrder, teamId, moveCnt);
      await cardModel.updateCardOrder({
        cardId: +cardId,
        cardOrder: +cardOrder,
        cardListId: +nowCardListId,
      });
      await cardListModel.increaseCardCount({ id: +nowCardListId });
      await cardListModel.decreaseCardCount({ id: +beforeCardListId });
      if (+moveCnt === 15) {
        await teamModel.updateMoveCnt({ id: +teamId, moveCnt: 0 });
        const [cards] = await cardModel.getCards({ cardListId: +nowCardListId });
        const resetOrder = cards.reduce(
          (
            acc: [[number, number]],
            cur: { id: number; content: string; cardListId: number; cardOrder: number },
            idx: number,
          ) => {
            acc.push([idx, +cur.id]);
            return acc;
          },
          [],
        );
        await cardModel.resetCardOrder({ resetOrder });
      } else {
        await teamModel.updateMoveCnt({ id: +teamId, moveCnt });
      }
      res.status(200).end();
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { cardId } = req.params;
  try {
    const [card] = await cardModel.deleteCard({ cardId: +cardId });
    res.status(200).end();
    return;
  } catch (err) {
    next(err);
  }
};

export const updateCardContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { cardId } = req.params;
  const { content } = req.body;
  console.log(cardId, content);
  if (verifyRequestData([content])) {
    try {
      const [cardList] = await cardModel.updateCardContent({ cardId: +cardId, content });
      res.status(200).end();
      return;
    } catch (err) {
      next(err);
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};
