import pool from '@/db';
import { Model } from '@/types';

export const userModel: Model = {
  updateUserProfileImage({ id, profileImage }: { id: number; profileImage: string }): any {
    const sql = 'UPDATE user SET profile_image=? WHERE id=?';
    return pool.execute(sql, [profileImage, id]);
  },
  updateUserProfileNickname({ id, nickname }: { id: number; nickname: string }): any {
    const sql = `UPDATE user SET nickname=? WHERE id=?`;
    return pool.execute(sql, [nickname, id]);
  },
  getUserById({ id }: { id: number }) {
    const sql = `SELECT id, email, nickname, profile_image as profileImage 
    FROM user
    WHERE id=?`;
    return pool.execute(sql, [id]);
  },
  login({ email }: { email: string }) {
    const sql = `SELECT id, email, pw, nickname, profile_image as profileImage
    FROM user
    WHERE email=?`;
    return pool.execute(sql, [email]);
  },
  signUp({ email, pw, nickname, profileImage }: { email: string; pw: string; nickname: string; profileImage: string }) {
    const sql = `INSERT INTO user (email, pw, nickname, profile_image) VALUES (?, ?, ?, ?)`;
    return pool.execute(sql, [email, pw, nickname, profileImage]);
  },
  logout({ id }: { id: number }) {
    const sql = 'UPDATE user SET refreshToken=null WHERE id=?';
    return pool.execute(sql, [id]);
  },
  isExistEmail({ email }: { email: string }) {
    const sql = `SELECT id FROM user WHERE email=?`;
    return pool.execute(sql, [email]);
  },
  setRefreshToken({ id, refreshToken }: { id: number; refreshToken: string }) {
    const sql = `UPDATE user SET refreshToken=? WHERE id=?`;
    return pool.execute(sql, [refreshToken, id]);
  },
  getRefreshToken({ id }: { id: number }) {
    const sql = `SELECT refreshToken FROM user WHERE id=?`;
    return pool.execute(sql, [id]);
  },
};
