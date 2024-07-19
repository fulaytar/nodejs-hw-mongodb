import { TEMP_PHOTO_DIR, TEMP_PUBLIC_DIR, TEMP_UPLOAD_DIR } from './constants/constants.js';
import { initMongoDB } from './db/initMongoConnection.js';
import setupServer from './server.js';
import createDirIfNotExists from './utils/reateDirIfNotExists.js';

const startServer = async () => {
  try {
    await initMongoDB();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(TEMP_PUBLIC_DIR);
    await createDirIfNotExists(TEMP_PHOTO_DIR);
    setupServer();
  } catch (error) {
    console.error('Error starting server...', error);
  }
};

startServer();
