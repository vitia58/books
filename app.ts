import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';

import authRouter from './routes/auth';
import booksRouter from './routes/books';

const app = express();

dotenv.config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/books', booksRouter);
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

export default app;
