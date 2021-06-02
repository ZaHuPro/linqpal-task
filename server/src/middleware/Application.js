import express from 'express';
import cors from 'cors';
import compression from 'compression';

import Log, { httpLogger } from '../utils/Logger';

export default (_express) => {
  Log.info('Middleware :: Booting the application level middleware...');

  // Enables the request body parser
  // For parsing application/json
  _express.use(express.json());
  // For parsing application/x-www-form-urlencoded
  _express.use(express.urlencoded({ extended: true }));

  // Enables Cross-Origin Resource Sharing (CORS) - HTTP-header based mechanism
  _express.use(cors());

  // Enables HTTP request by morgan NPM custom middleware
  _express.use(httpLogger);

  // Enables API data compression (GZip)
  _express.use(compression());

  return _express;
};
