import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';

import authRouter from './routes/auth';
import booksRouter from './routes/books';
import { authMiddleware } from './middlewares/auth';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/books', authMiddleware, booksRouter);

export default app;
