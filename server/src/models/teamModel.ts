import pool from '@/db';
import { Model } from '@/types';

export const teamModel: Model = {
  joinTeam({ id, channelId }: { id: number; channelId: number }) {
    const sql = `INSERT INTO user_team (id, channelId, is_deleted) VALUES (?, ?, ?);`;
    return pool.execute(sql, [id, channelId, false]);
  },
  withdrawTeam({ id, channelId }: { id: number; channelId: number }) {
    const sql = `UPDATE user_team SET is_deleted=true 
    WHERE team_id=? AND channel_id=?;`;
    return pool.execute(sql, [id, channelId]);
  },
  updateMoveCnt({ id, moveCnt }: { id: number; moveCnt: number }) {
    const sql = 'UPDATE team SET move_cnt=? WHERE id=?;';
    return pool.execute(sql, [moveCnt, id]);
  },
  getTeamUsers({ id }: { id: number }) {
    const sql = `SELECT id, email, nickname, profile_image AS profileImage
    FROM user
    JOIN user_team
    ON user_team.team_id=? AND user_team.user_id=user.id
    WHERE user_team.is_deleted=0;`;
    return pool.execute(sql, [id]);
  },
  getTeamList() {
    const sql = `SELECT id, team_name AS teamName FROM team
    WHERE is_deleted=0`;
    return pool.execute(sql, []);
  },
};
