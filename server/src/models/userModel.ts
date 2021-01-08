import pool from '@/db';
import { Model } from '@/types';

export const userModel = {
  updateUserProfileImage({ userId, profileImage }: { userId: number; profileImage: string }): any {
    const sql = 'UPDATE user SET profile_image=? WHERE id=?';
    return pool.execute(sql, [profileImage, userId]);
  },
  updateUserProfileNickname({ userId, nickname }: { userId: number; nickname: string }): any {
    const sql = `UPDATE user SET nickname=? WHERE id=?`;
    return pool.execute(sql, [nickname, userId]);
  },
  getUserById({ userId }: { userId: number }) {
    const sql = `SELECT id, email, nickname, profile_image as profileImage from user
    FROM id=?`;
    return pool.execute(sql, [userId]);
  },
};
