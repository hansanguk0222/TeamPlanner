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
      const fileName = file.name;
      const oldPath = file.path;
      profileImage = `${req.protocol}://${req.get('host')}/src/public/profile/${file.name}`;
      const rawData = await fs.readFile(oldPath);

      await fs.writeFile(`./src/public/profile/${fileName}`, rawData).catch((err) => {
        check = false;
        next(err);
      });

      await userModel.updateUserProfileNickname({ userId: +userId, nickname });
      await userModel.updateUserProfileImage({ userId: +userId, profileImage });
    })
    .on('end', () => {
      if (check) {
        res.status(200).json({});
      }
    });
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.params;
  try {
    const [user] = await userModel.getUserById({ userId: +userId });
    res.status(200).json({ user });
    return;
  } catch (err) {
    next(err);
  }
};
