import express, { Request, Response } from 'express';
import models from '../models'



/**-----------------------------------------*
 * Test Controller
 *-----------------------------------------*/
const controller = express.Router();


// GET
controller.get('/', async (req: Request, res: Response) => {
    await models.testModel.find({})
    .then((data: any[]) => {
        res.json({
            test_data_array: data
        });
    })
    .catch((err: any) => {
        res.status(400).json({
            message: err.message,
            errors: err
        });
    });
});


//POST
controller.post('/', async (req: Request, res: Response) => {
    const newTest = new models.testModel({
        title: req.body.title,
        desc: req.body.desc || ""
    });

    await newTest.save()
    .then((data: any) => {
        res.status(201).json({
            message: "New Test data added!",
            data: data
        });
    })
    .catch((err: any) => {
        res.status(400).json({
            message: err.message,
            errors: err
        });
    });
});


export default controller;