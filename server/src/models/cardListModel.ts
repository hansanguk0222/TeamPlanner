import pool from '@/db';
import { Model } from '@/types';

export const cardListModel: Model = {
  getCardLists({ teamId }: { teamId: number }) {
    const sql = `SELECT id, cardList_name as cardListName, team_id as teamId, card_count as cardCount from cardList
      WHERE team_id=? AND is_deleted=0`;
    return pool.execute(sql, [teamId]);
  },
  createCardList({ teamId, cardListName }: { teamId: number; cardListName: string }) {
    const sql = `INSERT INTO cardList (team_id, cardList_name) VALUES (?, ?)`;
    return pool.execute(sql, [teamId, cardListName]);
  },
  deleteCardList({ id }: { id: number }) {
    const sql = `UPDATE cardList SET is_deleted=1 WHERE id=?`;
    return pool.execute(sql, [id]);
  },
  updateCardListName({ id, cardListName }: { id: number; cardListName: string }) {
    const sql = `UPDATE cardList SET cardList_name=? WHERE id=?`;
    return pool.execute(sql, [cardListName, id]);
  },
  increaseCardCount({ id }: { id: number }) {
    const sql = `UPDATE cardList SET card_count = card_count + 1 WHERE id=?`;
    return pool.execute(sql, [id]);
  },
  decreaseCardCount({ id }: { id: number }) {
    const sql = 'UPDATE cardList SET card_count = card_count - 1 WHERE id=?';
    return pool.execute(sql, [id]);
  },
};
