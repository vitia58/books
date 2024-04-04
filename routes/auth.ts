import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

/* GET home page. */
router.get('/auth/token', (req: Request, res: Response) => {
  res.json({
    token: jwt.sign({ user: 'NoNameBackender' }, 'secret', { expiresIn: '2h' }),
  });
});

export default router;
