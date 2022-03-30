/* eslint-disable @typescript-eslint/ban-ts-comment */
import express, { Request, Response } from 'express';
import models from '../models';
import middlewares from '../middlewares';

/** -----------------------------------------*
 * UserController
 * @Fetch User Data
 *-----------------------------------------*/
const controller = express.Router();

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable new-cap */
controller.get(
  '/user',
  [middlewares.verifyToken],
  // eslint-disable-next-line consistent-return
  async (req: Request, res: Response) => {
    // let user = req.user!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // @ts-ignore
    const { id, key } = req.user;
    const getUser = await models.UserModel.findOne({
      _id: id,
      email: key,
    }).exec();
    if (!getUser) {
      return res.status(404).json({
        message: 'User not found anymore.',
      });
    }

    res.status(200).json({
      userInfo: {
        name: getUser.name,
        email: getUser.email,
        role: getUser.role,
        createdAt: getUser.createdAt,
        updatedAt: getUser.updatedAt,
      },
    });
  }
);

export default controller;
