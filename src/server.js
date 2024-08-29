import 'dotenv/config';
import express from 'express';
import path from 'node:path';
// import pino from 'pino-http';
import cors from 'cors';
import { errorMiddleware } from './middlewares/ErrorHandler.js';
import { notFoundMiddleware } from './middlewares/notFoundHandler.js';
import contactRoutes from './routers/contacts.js';
import authRouter from './routers/auth.js';
import cookieParser from 'cookie-parser';
import { authenticate } from './middlewares/authenticate.js';

export const setupServer = () => {
  const app = express();

  app.use(cookieParser());

  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.use(cors());

  app.use(
    '/contactAvatars',
    express.static(path.resolve('src', 'public', 'contactAvatars')),
  );
  app.get('/', (req, res) => {
    res.send('Your contacts book');
  });
  app.use('/auth', authRouter);
  app.use('/contacts', authenticate, contactRoutes);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  const PORT = parseInt(process.env.PORT) || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}!`);
  });
};
