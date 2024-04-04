import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateMiddleware = <T>(schema: ZodSchema<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const data = schema.safeParse(req.body);

    if (!data.success) {
      req.body = data['data'];

      return res.status(400).json({ message: data['error'].format() });
    }
    next();
  };
};
