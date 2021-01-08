import pool from '@/db';

export const teamModel = {
  joinTeam({ teamId, channelId }: { teamId: number; channelId: number }) {
    const sql = `INSERT INTO user_team (teamId, channelId, is_deleted) VALUES (?, ?, ?);`;
    return pool.execute(sql, [teamId, channelId, false]);
  },
  withdrawTeam({ teamId, channelId }: { teamId: number; channelId: number }) {
    const sql = `UPDATE user_team SET is_deleted=true 
    WHERE team_id=? AND channel_id=?;`;
    return pool.execute(sql, [teamId, channelId]);
  },
  updateMoveCnt({ teamId, moveCnt }: { teamId: number; moveCnt: number }) {
    const sql = 'UPDATE team SET move_cnt=? WHERE id=?;';
    return pool.execute(sql, [moveCnt, teamId]);
  },
  getTeamUsers({ teamId }: { teamId: number }) {
    const sql = `SELECT id, email, nickname, profile_image 
    FROM user
    JOIN user_team
    ON user_team.team_id=? AND user_team.user_id=user.id
    WHERE user_team.is_deleted=0;`;
  },
};
