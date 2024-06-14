import cors from 'cors';
import pino from 'pino-http';
import express from 'express';

import env from './utils/env.js';

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

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not Found',
    });
  });

  app.listen(port, () => console.log(`Server running on ${port} PORT`));
};

export default setupServer;
