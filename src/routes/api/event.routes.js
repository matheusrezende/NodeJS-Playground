/**
 * Event Routes
 */
import {Router} from 'express';
import validate from 'express-validation';

import * as EventController from '../../controllers/event.controller';

const routes = new Router();

/**
 * CRUD
 */

routes.get('/', EventController.getList);


routes.get('/:id', EventController.getById);

routes.post(
  '/',
  validate(EventController.validation.create),
  EventController.create,
);

routes.put(
  '/:id',
  validate(EventController.validation.update),
  EventController.updateEvent,
);

routes.delete('/:id', EventController.deleteEvent);

export default routes;
