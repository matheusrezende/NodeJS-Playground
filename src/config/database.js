/* eslint-disable no-console */

/**
 * Configuration for the database
 */

import mongoose from 'mongoose';

import constants from './constants';
// Remove the warning with Promise
mongoose.Promise = global.Promise;

// If debug run the mongoose debug options
mongoose.set('debug', process.env.MONGOOSE_DEBUG);

// Connect the db with the url provide
try {
  mongoose.connect(constants.MONGODB_URI, {useNewUrlParser: true});
} catch (err) {
  mongoose.createConnection(constants.MONGODB_URI, {useNewUrlParser: true});
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', (e) => {
    throw e;
  });
