import dotenv from 'dotenv';
import Log from '../utils/Logger';

// Initializes the configs which is extracting data from .env
Log.info('ENV :: Registering the env file');
dotenv.config();

export const ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 5000;
export const ENABLE_CHILD_PROCESS = process.env.ENABLE_CHILD_PROCESS !== 'NO';
export const MONGO_DB_URL = process.env.MONGO_DB_URL || '';
export const IS_PRODUCTION = ENV === 'production';
export const API_PREFIX = process.env.API_PREFIX || 'api';

export default {
  PORT,
  ENV,
  ENABLE_CHILD_PROCESS,
  IS_PRODUCTION,
  MONGO_DB_URL,
};
