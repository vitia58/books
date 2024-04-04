import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    jwt.verify(token, 'secret');
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
