import express from 'express';
import Log from '../utils/Logger';
import applicationMiddleware from '../middleware/Application';
import apiRouter from '../router/Api';
import { PORT, API_PREFIX } from './Configs';
import { expressErrorHandler, notFoundHandler } from '../utils/Exception';

export default () => {
  Log.info('SERVER :: Initializes the express server');
  let app = express();

  // Application level middleware
  app = applicationMiddleware(app);

  Log.info('Routes :: Mounting API Routes...');
  app.use(`/${API_PREFIX}`, apiRouter);

  // Registering Error Handler and Not Found Handler
  app.use(expressErrorHandler);
  app = notFoundHandler(app);

  // Listens for connections on the specified ports
  app.listen(PORT, (_error) => {
    if (_error) {
      Log.error('SERVER :: Failed to initialize the express server', _error);
      process.exit(1);
    }
    return Log.info(`SERVER :: Running @ ${PORT}`);
  });
};
