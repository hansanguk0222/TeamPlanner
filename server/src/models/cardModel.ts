import pool from '@/db';
import { Model } from '@/types';

export const cardModel: Model = {
  createCard({ content, cardListId, cardOrder }: { content: string; cardListId: number; cardOrder: number }) {
    const sql = 'INSERT INTO card (cardList_id, content, card_order) VALUES (?, ?, ?)';
    return pool.execute(sql, [cardListId, content, cardOrder]);
  },
  getCards({ cardListId }: { cardListId: number }) {
    const sql = `SELECT id, content, cardList_id as cardListId, card_order as cardOrder from card 
    WHERE cardList_id=? 
    ORDER BY card_order;`;
    return pool.execute(sql, [cardListId]);
  },
  updateCardOrder({ cardId, cardOrder }: { cardId: number; cardOrder: number }) {
    const sql = `UPDATE card SET card_order=? WHERE id=?;`;
    return pool.execute(sql, [cardOrder, cardId]);
  },
  updateCardContent({ cardId, content }: { cardId: number; content: string }) {
    const sql = 'UPDATE card SET content=? WHERE id=?;';
    return pool.execute(sql, [content, cardId]);
  },
  deleteCard({ cardId }: { cardId: number }) {
    const sql = 'UPDATE card SET is_deleted=1 WHERE id=?;';
    return pool.execute(sql, [cardId]);
  },
  resetCardOrder({ resetOrder }: { resetOrder: [[number, number]] }) {
    const sql = resetOrder.reduce((query: string, cur: [number, number]) => {
      const newQuery = query.concat(`UPDATE card SET card_order=${cur[0]} WHERE id=${cur[1]};`);
      return newQuery;
    }, '');
    console.log(sql);
    return pool.query(sql, []);
  },
};
