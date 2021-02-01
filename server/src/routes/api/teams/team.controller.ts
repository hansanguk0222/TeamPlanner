import { Request, Response, NextFunction } from 'express';
import { teamModel } from '@/models';
import { Team } from '@/types';

export const getTeamList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [teamList] = await teamModel.getTeamList();
    const teamListAndJoinUsers = await Promise.all(
      teamList.map(async (team: Team) => {
        try {
          const [joinUsers] = await teamModel.getTeamUsers({ id: team.id });
          return { ...team, joinUsers };
        } catch (err) {
          next(err);
        }
      }),
    );
    res.status(200).json({ teamList: teamListAndJoinUsers });
  } catch (err) {
    next(err);
  }
};
