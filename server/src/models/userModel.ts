import pool from '@/db';
import { Model } from '@/types';

export const userModel: Model = {
  updateUserProfileImage({ userId, profileImage }: { userId: number; profileImage: string }): any {
    const sql = 'UPDATE user SET profile_image=? WHERE id=?';
    return pool.execute(sql, [profileImage, userId]);
  },
  updateUserProfileNickname({ userId, nickname }: { userId: number; nickname: string }): any {
    const sql = `UPDATE user SET nickname=? WHERE id=?`;
    return pool.execute(sql, [nickname, userId]);
  },
  getUserById({ userId }: { userId: number }) {
    const sql = `SELECT id, email, nickname, profile_image as profileImage 
    FROM user
    WHERE id=?`;
    return pool.execute(sql, [userId]);
  },
  login({ email, pw }: { email: string; pw: string }) {
    const sql = `SELECT id, email, nickname, profile_image
    FROM user
    WHERE email=? AND pw=?`;
    return pool.execute(sql, [email, pw]);
  },
};
