import { initMongoDB } from './db/initMongoConnection.js';
import setupServer from './server.js';

const startServer = async () => {
  try {
    await initMongoDB();
    setupServer();
  } catch (error) {
    console.error('Error starting server...', error);
  }
};

startServer();
