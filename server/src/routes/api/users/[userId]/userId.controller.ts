import { userModel } from '@/models';
import { IncomingForm } from 'formidable';
import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { ERROR_MESSAGE } from '@/utils/contants';
import { promises as fs } from 'fs';

export const updateUserProfile = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;
  let check = true;
  let profileImage: string;
  let nickname: string;
  const form = new IncomingForm();

  form.parse(req);

  form
    .on('field', (name, value) => {
      if (verifyRequestData([value])) {
        nickname = value;
      }
    })
    .on('file', async (field, file) => {
      const fileType = file.type.split('/');
      if (fileType[0] !== 'image' || !fileType[1].match(/jpg|jpeg|png|svg/)) {
        res.status(400).json({ message: ERROR_MESSAGE.NOT_ALLOWED_FILE_TYPE });
        return;
      }
      const fileName = `${userId}_profile`;
      const oldPath = file.path;
      profileImage = `${req.protocol}://${req.get('host')}/profile/${fileName}.${fileType[1]}`;
      const rawData = await fs.readFile(oldPath);

      await fs.writeFile(`./src/public/profile/${fileName}.${fileType[1]}`, rawData).catch((err) => {
        check = false;
        next(err);
      });

      await userModel.updateUserProfileNickname({ id: +userId, nickname });
      await userModel.updateUserProfileImage({ id: +userId, profileImage });

      if (check) {
        res.status(200).end();
      }
    });
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.params;
  try {
    const [[user]] = await userModel.getUserById({ id: +userId });
    res.status(200).json({ user });
    return;
  } catch (err) {
    next(err);
  }
};
