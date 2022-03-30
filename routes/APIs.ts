import express, { Request, Response } from 'express';
import controllers from '../controllers';

/** ==============================================*
 * Handling All REST APIs routes
 * @Register of all API end-points
 *============================================== */

const router = express.Router(); // Router instance from ExpressJs

// Hello world
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello, World! from API end-point.',
    reqTime: new Date(Date.now()).toUTCString(),
  });
});

// Test Controller
router.use('/test', controllers.testController);

// Auth Controllers [Group :=> Auth]
router.use('/auth', [
  controllers.auth.registerController,
  controllers.auth.loginController,
  controllers.userController,
]);

export default router;
