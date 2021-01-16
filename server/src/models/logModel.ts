import pool from '@/db';
import { Model } from '@/types';

export const logModel: Model = {
  getLogs({ teamId }: { teamId: number }) {
    const sql = `SELECT id, user_id, updated_at as updatedAt, work from log WHERE team_id=?`;
    return pool.execute(sql, [teamId]);
  },
  createLog({ teamId, userId, work }: { teamId: number; userId: number; work: number }) {
    const sql = 'INSERT INTO log (team_id, user_id, work) VALUES(?, ?, ?);';
    return pool.execute(sql, [teamId, userId, work]);
  },
};
