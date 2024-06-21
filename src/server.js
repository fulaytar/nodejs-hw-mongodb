import cors from 'cors';
import pino from 'pino-http';
import express from 'express';
import env from './utils/env.js';
import NotFoundHandler from './middlewares/NotFoundHandler.js';
import contactsRouter from './routers/contactRouters.js';

const port = env('PORT', '3000');

const setupServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());

  app.use('/contacts', contactsRouter);

  app.use(NotFoundHandler);

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

export default setupServer;
