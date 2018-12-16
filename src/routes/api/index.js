/*
 * @Author: Matheus Rezende
 * @Date: 2018-06-20 23:00:13
 * @Last Modified by: matheus.rezende
 * @Last Modified time: 2018-12-16 08:48:17
 */
/**
 * API Routes
 */

import {Router} from 'express';
import HTTPStatus from 'http-status';

import EventRoutes from './event.routes';
import APIError from '../../services/error';

// Middlewares
import logErrorService from '../../services/log';

const routes = new Router();


routes.use('/event', EventRoutes)

routes.all('*', (req, res, next) => next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true)));

routes.use(logErrorService);

export default routes;
