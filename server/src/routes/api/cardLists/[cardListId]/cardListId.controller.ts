import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { ERROR_MESSAGE } from '@/utils/contants';
import { cardListModel } from '@/models';

export const deleteCardList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { cardListId } = req.params;
  try {
    const [cardList] = await cardListModel.deleteCardList({ cardListId: +cardListId });
    res.status(200).json(cardList);
    return;
  } catch (err) {
    next(err);
  }
};

export const updateCardListName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { cardListName } = req.body;
  const { cardListId } = req.params;
  if (verifyRequestData([cardListName])) {
    try {
      const [cardList] = await cardListModel.updateCardListName({ cardListId: +cardListId, cardListName });
      res.status(201).json(cardList);
      return;
    } catch (err) {
      next(err);
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};
