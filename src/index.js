import { initMongoDB } from './db/initMongoConnection.js';
import setupServer from './server.js';

const bootstrap = async () => {
  try {
    await initMongoDB();
    setupServer();
  } catch (error) {
    console.error('Error during bootstrap', error);
  }
};

bootstrap();
