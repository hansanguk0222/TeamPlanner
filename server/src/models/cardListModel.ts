import pool from '@/db';

export const cardListModel = {
  getCardLists({ teamId }: { teamId: number }) {
    const sql = `SELECT id, cardList_name as cardListName, team_id as teamId, card_count as cardCount from cardList
      WHERE team_id=? AND is_deleted=0`;
    return pool.execute(sql, [teamId]);
  },
  createCardList({ teamId, cardListName }: { teamId: number; cardListName: string }) {
    const sql = `INSERT INTO cardList (team_id, cardList_name) VALUES (?, ?)`;
    return pool.execute(sql, [teamId, cardListName]);
  },
  deleteCardList({ cardListId }: { cardListId: number }) {
    const sql = `UPDATE cardList SET is_deleted=1 WHERE id=?`;
    return pool.execute(sql, [cardListId]);
  },
  updateCardListName({ cardListId, cardListName }: { cardListId: number; cardListName: string }) {
    const sql = `UPDATE cardList SET cardList_name=? WHERE id=?`;
    return pool.execute(sql, [cardListName, cardListId]);
  },
};
