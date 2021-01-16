import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { ERROR_MESSAGE } from '@/utils/contants';
import { cardListModel } from '@/models';

// GET /cardList/team/:teamId
export const getCardLists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { teamId } = req.params;
  try {
    const [cardLists] = await cardListModel.getCardLists({ teamId: +teamId });
    res.status(200).json({ cardLists });
    return;
  } catch (err) {
    next(err);
  }
};

// POST /cardList/team/:teamId
export const createCardList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { cardListName } = req.body;
  const { teamId } = req.params;
  if (verifyRequestData([cardListName])) {
    try {
      await cardListModel.createCardList({ teamId: +teamId, cardListName });
      res.status(201).json({ message: 'ok' });
      return;
    } catch (err) {
      next(err);
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};
