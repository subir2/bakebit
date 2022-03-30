import express, { Request, Response } from 'express';
import models from '../../models';
import utils from '../../utils';

/** -----------------------------------------*
 * AuthController
 * @Login User
 *-----------------------------------------*/
const controller = express.Router();
/* eslint-disable @typescript-eslint/no-explicit-any */
// POST Login user
// eslint-disable-next-line consistent-return
controller.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(406).json({
      message: 'Error! please fill-up all fields & try.',
    });
  }

  const findUser = await models.UserModel.findOne({ email }).exec();
  if (!findUser) {
    // user not found
    return res.status(404).json({
      message: 'User not found!',
      reqBody: req.body,
    });
  }
  // check user password
  const checkPwd = await utils.comparePassword(password, findUser.password);
  if (checkPwd) {
    // password verified = OK
    // generate JWT and give response
    const jwtToken: string = await utils.generateJWT(
      findUser.email,
      // eslint-disable-next-line no-underscore-dangle
      findUser._id
    );
    // response
    res.status(202).json({
      message: 'Login successfull!',
      userInfo: {
        name: findUser.name,
        email: findUser.email,
        role: findUser.role,
        createdAt: findUser.createdAt,
        updatedAt: findUser.updatedAt,
      },
      accessToken: jwtToken,
    });
  } else {
    // wrong password
    return res.status(401).json({
      message: 'Incorrect password',
    });
  }
});

export default controller;
