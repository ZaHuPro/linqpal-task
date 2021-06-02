import mongoose from 'mongoose';
import bluebird from 'bluebird';

import Log from '../utils/Logger';
import { MONGO_DB_URL } from './Configs';

export const loadDatabase = () => {
  const options = { useNewUrlParser: true, useUnifiedTopology: true };

  // bluebird to make the MongoDB module run asynchronously
  (mongoose).Promise = bluebird;

  mongoose.set('useCreateIndex', true);
  Log.debug(`MONGO_DB :: Connecting to mongo server at: ${MONGO_DB_URL}`);
  mongoose.connect(MONGO_DB_URL, options, (error) => {
    // handle the error case
    if (error) {
      Log.error('MONGO_DB :: Failed to connect to the Mongo server!!', error);
      process.exit(1);
    } else {
      Log.info('MONGO_DB :: Connected to mongo server');
    }
  });
};

export default mongoose;
