import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { ERROR_MESSAGE } from '@/utils/contants';
import { cardModel, teamModel } from '@/models';

export const updateCardOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { cardId } = req.params;
  const { cardListId, cardOrder, teamId, moveCnt } = req.body;
  if (verifyRequestData([cardListId, cardOrder, teamId, moveCnt])) {
    try {
      await cardModel.updateCardOrder({
        cardId: +cardId,
        cardOrder: +cardOrder,
      });
      if (+moveCnt === 15) {
        await teamModel.updateMoveCnt({ teamId, moveCnt: 0 });
        const [cards] = await cardModel.getCards({ cardListId: +cardListId });
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
        await teamModel.updateMoveCnt({ teamId, moveCnt });
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
