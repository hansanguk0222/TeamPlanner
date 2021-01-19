import pool from '@/db';
import { Model } from '@/types';
import { profile } from 'console';

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
  login({ email }: { email: string }) {
    const sql = `SELECT id, email, pw, nickname, profile_image
    FROM user
    WHERE email=?`;
    return pool.execute(sql, [email]);
  },
  signUp({
    email,
    pw,
    nickname,
    profileImage,
  }: {
    email: string;
    pw: string;
    nickname: string;
    profileImage: string;
  }): any {
    const sql = `INSERT INTO user (email, pw, nickname, profile_image) VALUES (?, ?, ?, ?)`;
    return pool.execute(sql, [email, pw, nickname, profileImage]);
  },
  isExistEmail({ email }: { email: string }) {
    const sql = `SELECT id FROM user WHERE email=?`;
    return pool.execute(sql, [email]);
  },
  setRefreshToken({ id, refreshToken }: { id: number; refreshToken: string }) {
    const sql = `UPDATE user SET refreshToken=? WHERE id=?`;
    return pool.execute(sql, [refreshToken, id]);
  },
};
