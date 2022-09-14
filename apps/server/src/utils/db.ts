import mongoose from 'mongoose';

import { DATABASE_URL } from '../constants';
import logger from './logger';

export const connectToDb = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    logger.info('Connected to DB');
  } catch (e) {
    logger.error(e, 'Error connecting to DB');
    process.exit(1);
  }
};
