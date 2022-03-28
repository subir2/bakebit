/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable new-cap */
import express, { Request, Response } from 'express';
import models from '../models';

/** -----------------------------------------*
>>>>>>> backend
 * Test Controller
 *-----------------------------------------*/
const controller = express.Router();

// GET
controller.get('/', async (req: Request, res: Response) => {
  await models.TestModel.find({})
    .then((data) => {
      res.json({
        data_array: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
        errors: err,
      });
    });
});

// POST
controller.post('/', async (req: Request, res: Response) => {
  const newTest = new models.TestModel({
    title: req.body.title,
    desc: req.body.desc || '',
  });

  await newTest
    .save()
    .then((data: any) => {
      res.status(201).json({
        message: 'New Test data added!',
        data,
      });
    })
    .catch((err: any) => {
      res.status(400).json({
        message: err.message,
        errors: err,
      });
    });
});

export default controller;
