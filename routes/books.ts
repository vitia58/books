import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });
});

export default router;
