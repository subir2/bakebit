import express, { Request, Response } from 'express';
import models from '../models';
import verifyJWT from '../middlewares/jwtTokenCheck';

/** -----------------------------------------*
 * UserController
 * @Fetch User Data
 *-----------------------------------------*/
const controller = express.Router();

/* eslint-disable @typescript-eslint/no-explicit-any */
// GET get user data
// eslint-disable-next-line consistent-return
controller.get('/user', [verifyJWT], async (req: Request, res: Response) => {
  // let user = req.user!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { id } = req.user!;
  const getUser = await models.UserModel.findOne({ id }).exec();
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
});

export default controller;
