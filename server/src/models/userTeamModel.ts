import pool from '@/db';
import { Model } from '@/types';

export const userTeamModel: Model = {
  isJoinedUser({ userId, teamId }: { userId: number; teamId: number }) {
    const sql = `SELECT * FROM user_team
    WHERE user_id=? AND team_id = ?`;
    return pool.execute(sql, [userId, teamId]);
  },
};
