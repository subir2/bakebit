/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
export default async function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // verifying JWT token
  let token: string | undefined = req.headers.authorization;
  if (!token) {
    // have no token
    return res.status(401).json({
      message: 'Unauthorized! Invalid Token.',
    });
  }

  if (token.toLowerCase().startsWith('bearer')) {
    token = token.slice('bearer'.length).trim();
  }

  try {
    const decode = await jwt.verify(token, process.env.JWT_SECRET || 'bakebit');
    // @ts-ignore
    req.user = decode;
    next(); // procced to next
  } catch (err: any) {
    return res.status(412).json({
      message: err.message,
      errors: err,
    });
  }
}
