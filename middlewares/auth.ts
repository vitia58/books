import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers['authorization'];
  const token = authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
