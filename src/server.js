import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import env from './utils/env.js';
import contactsRouter from './routers/contactRouters.js';
import logger from './middlewares/logger.js';
import { TEMP_PUBLIC_DIR, TEMP_UPLOAD_DIR } from './constants/constants.js';

import errorHandler from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import authRouter from './routers/auth-router.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const port = env('PORT', '3000');

const setupServer = () => {
  const app = express();

  app.use(logger);
  app.use(express.json()); // don`t forget
  app.use(cors());
  app.use(cookieParser()); //cookies

  app.use('/uploads', express.static(TEMP_UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use(express.static(TEMP_PUBLIC_DIR)); // get static file

  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

export default setupServer;
