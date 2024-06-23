/* import notFoundHandler from './middlewares/notFoundHandler.js'; */
import cors from 'cors';
import express from 'express';
import env from './utils/env.js';
import contactsRouter from './routers/contactRouters.js';
import logger from './middlewares/logger.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

const port = env('PORT', '3000');

const setupServer = () => {
  const app = express();

  app.use(logger);
  app.use(express.json()); // don`t forget
  app.use(cors());

  app.use('/contacts', contactsRouter);

  app.use(errorHandler);
  app.use(notFoundHandler);

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

export default setupServer;
