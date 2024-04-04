import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth';
import { z } from 'zod';
import { validateMiddleware } from '../middlewares/validation';

const prisma = new PrismaClient();
const router = Router();

const createBookSchema = z.object({
  title: z.string(),
  author: z.string(),
});

const updateBookSchema = z.optional(createBookSchema);

export type CreateBookPayload = z.infer<typeof createBookSchema>;
export type UpdateBookPayload = z.infer<typeof updateBookSchema>;

router.get('/', async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();
  res.json(books);
});

router.post(
  '/',
  authMiddleware,
  validateMiddleware(createBookSchema),
  async (req: Request, res: Response) => {
    const { title, author }: CreateBookPayload = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
      },
    });
    res.status(201).json(book);
  },
);

router.patch(
  '/:id',
  authMiddleware,
  validateMiddleware(updateBookSchema),
  async (req: Request, res: Response) => {
    const { title, author }: UpdateBookPayload = req.body;
    const { id } = req.params;

    try {
      const book = await prisma.book.update({
        where: { id },
        data: {
          title,
          author,
        },
      });
      res.status(200).json(book);
    } catch (error) {
      res.status(404).json({ message: 'Book not found' });
    }
  },
);

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.book.delete({
      where: { id },
    });
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    res.status(404).json({ message: 'Book not found' });
  }
});

export default router;
