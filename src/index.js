/**
 * Server setup
 */

import chalk from 'chalk';
import express from 'express';

import ApiRoutes from './routes/api';
import constants from './config/constants';
import middlewaresConfig from './config/middlewares';
import './config/database';

const app = express();

// Wrap all the middlewares with the server
middlewaresConfig(app);

// Add the apiRoutes stack to the server
app.use('/api', ApiRoutes);

// We need this to make sure we don't run a second instance
if (!module.parent) {
  app.listen(constants.PORT, (err) => {
    if (err) {
      console.log(chalk.red('Cannot run!'));
    } else {
      console.log(chalk.green.bold(`
        Yep this is working
        App listen on port: ${constants.PORT} 🍕
        Env: ${process.env.NODE_ENV} 🦄
      `));
    }
  });
}

export default app;
