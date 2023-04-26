import mongoose from 'mongoose';
import logger from '../config/logger.js';

// connect to database
mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/messagedb');
    logger.info('connected to EB DATABASE');
  } catch (error) {
    logger.info(error);
  }
};

// export connectDB
export default { connectDB };
