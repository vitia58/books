import { Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';
const router = Router();

router.post('/token', (req: Request, res: Response) => {
  res.json({
    token: jwt.sign({ user: 'NoNameBackender' }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    }),
  });
});

export default router;
