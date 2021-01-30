import { Request, Response, NextFunction } from 'express';
import { teamModel, userTeamModel } from '@/models';
import { ERROR_MESSAGE } from '@/utils/contants';

export const isJoinedUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { teamId, userId } = req.params;
  try {
    const [user] = await userTeamModel.isJoinedUser({ userId: +userId, teamId: +teamId });

    if (user.length === 0) {
      res.status(400).json({ message: ERROR_MESSAGE.IS_NOT_JOINED_USER });
      return;
    }
    res.status(200).end();
    return;
  } catch (err) {
    next(err);
  }
};
