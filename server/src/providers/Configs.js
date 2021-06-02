import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Log from '../utils/Logger';

const readKey = (_fileName) => {
  const filePath = path.resolve(__dirname, `../../keys/${_fileName}`);
  const key = fs.readFileSync(filePath, 'utf8');
  return key;
};

// Initializes the configs which is extracting data from .env
Log.info('ENV :: Registering the env file');
dotenv.config();

export const ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 5000;
export const ENABLE_CHILD_PROCESS = process.env.ENABLE_CHILD_PROCESS !== 'NO';
export const MONGO_DB_URL = process.env.MONGO_DB_URL || '';
export const IS_PRODUCTION = ENV === 'production';
export const API_PREFIX = process.env.API_PREFIX || 'api';
export const PUBLIC_KEY = process.env.PUBLIC_KEY || readKey('public.pem');
export const PRIVATE_KEY = process.env.PRIVATE_KEY || readKey('private.pem');
export const PASS_PHRASE = process.env.PASS_PHRASE || '';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'vYyuKE2z0c';

export default {
  PORT,
  ENV,
  ENABLE_CHILD_PROCESS,
  MONGO_DB_URL,
  IS_PRODUCTION,
  API_PREFIX,
  PUBLIC_KEY,
  PRIVATE_KEY,
  PASS_PHRASE,
};
