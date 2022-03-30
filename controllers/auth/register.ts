import express, { Request, Response } from 'express';
import models from '../../models';
import utils from '../../utils';

/** -----------------------------------------*
 * AuthController
 * @Register User
 *-----------------------------------------*/
const controller = express.Router();
/* eslint-disable @typescript-eslint/no-explicit-any */
// POST Register a new user
// eslint-disable-next-line consistent-return
controller.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(406).json({
      message: 'Error! please fill-up all fields and try.',
    });
  }
  const findUser = await models.UserModel.findOne({ email }).exec();
  // console.log(`findUser =>\n`, findUser);
  if (!findUser) {
    // continue
    const newUser = {
      name,
      email,
      password: await utils.hashPwd(password),
    };
    await new models.UserModel(newUser)
      .save()
      .then(async (data: any) => {
        // jenerate JWT
        // eslint-disable-next-line no-underscore-dangle
        const jwtToken: string = await utils.generateJWT(data.email, data._id);

        // send response
        res.status(201).json({
          message: 'Registration has been successfull!',
          userInfo: {
            name: data.name,
            email: data.email,
            role: data.role,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          },
          accessToken: jwtToken,
        });
      })
      .catch((err: any) => {
        res.status(400).json({
          message: err.message,
          errors: err,
        });
      });
  } else {
    // user already exists
    return res.status(406).json({
      message: 'User already exists!',
      reqBody: req.body,
    });
  }
});

export default controller;
