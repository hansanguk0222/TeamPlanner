import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { ERROR_MESSAGE } from '@/utils/contants';
import { cardModel } from '@/models';

// GET /card/cardList/:cardListId
export const getCards = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { cardListId } = req.params;
  try {
    const [cards] = await cardModel.getCards({ cardListId: +cardListId });
    res.status(200).json({ cards });
    return;
  } catch (err) {
    next(err);
  }
};

// POST /card/cardList/:cardListId
export const createCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { content, cardOrder } = req.body;
  const { cardListId } = req.params;
  if (verifyRequestData([content, cardOrder])) {
    try {
      const [card] = await cardModel.createCard({ content, cardListId: +cardListId, cardOrder: +cardOrder });
      res.status(201).json(card);
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};
