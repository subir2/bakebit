import express, { Request, Response } from 'express';
import APIs from './APIs';
import cors from 'cors';
import * as path from 'path';

/**==============================================*
 * Handling ROUTER for all requests in this file
 * Routes registerer
 * @Main Router
 *===============================================*/

const router = express.Router();    // Router instance from ExpressJs


// REST APIs setup
router.use('/api', cors(),  APIs); // CORS enabled for all api requests

// Welcome page
router.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve("views/welcome.html"));
});

// Not found 404
router.use('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve("views/404.html"));
});



export default router;