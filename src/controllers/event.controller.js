/**
 * Event Controller
 */

import HTTPStatus from 'http-status';
import Joi from 'joi';
import Event from '../models/event.model'
import {filteredBody} from '../utils/filteredBody';
import WHITE_LIST from '../constants/whitelist';

export const validation = {
  create: {
    body: {
      name: Joi.string().min(3).required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
  
    },
  },
  update: {
    body: {
      name: Joi.string().min(3).required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
    },
  },
};

/**
 * @api {get} /event Get events
 * @apiDescription Get a list of events
 * @apiName getListOfEvent
 * @apiGroup Event
 *
 * @apiSuccess {String} name Event title.
 * @apiSuccess {Date} startDate Event start date.
 * @apiSuccess {Date} endDate Event end date.
 *
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Conent-Type": "application/json"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * [
 *  {
 *   "_id": "5b6427b515abcc5435743455",
 *   "name": "event",
 *   "ending": "2018-08-16T18:15:34.000Z",
 *   "beginning": "2018-08-03T04:28:54.000Z"
 *  },
 *  {
 *   "_id": "5b6427b515abcc5435743455",
 *   "name": "event",
 *   "ending": "2018-08-16T18:15:34.000Z",
 *   "beginning": "2018-08-03T04:28:54.000Z"
 *  },
 * ]
 *
 */
export async function getList(req, res, next) {
  try {
    const data = await Event.find().populate('author')

    return res.status(HTTPStatus.OK).json(data);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

/**
 * @api {get} /event/:id Get a single event by Id
 * @apiDescription Get a single event
 * @apiName getEventById
 * @apiGroup Event
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiSuccess {String} name Event title.
 * @apiSuccess {Date} startDate Event start date.
 * @apiSuccess {Date} endDate Event end date.
 *
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *   "_id": "5b6427b515abcc5435743455",
 *   "name": "matheus",
 *   "startDate": "2018-08-16T18:15:34.000Z",
 *   "endDate": "2018-08-03T04:28:54.000Z"
 * },
 *
 * @apiErrorExample {json} Event not found
 *    HTTP/1.1 404 Not Found
 */
export async function getById(req, res, next) {
  try {
    const result = await Event.findById(req.params.id)
    if (!result) {
      return res.sendStatus(HTTPStatus.NOT_FOUND)
    }
    return res.status(HTTPStatus.OK).json(result)
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

/**
 * @api {post} /event Create a event
 * @apiDescription Create a event
 * @apiName createEvent
 * @apiGroup Event
 *
 * @apiParam (Body) {String} name Event title.
 * @apiParam (Body) {Date} startDate Event starting date (UNIX Timestamp).
 * @apiParam (Body) {Date} endDate Event ending date (UNIX Timestamp).
 *
 * @apiSuccess {String} name Event title.
 * @apiSuccess {Date} startDate Event start date.
 * @apiSuccess {Date} endDate Event end date.
 *
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *   "_id": "5b6427b515abcc5435743455",
 *   "name": "event",
 *   "startDate": "2018-08-16T18:15:34.000Z",
 *   "endDate": "2018-08-03T04:28:54.000Z"
 * }
 *
 */
export async function create(req, res, next) {
  try {
    const requestbody = filteredBody(req.body, WHITE_LIST.event.create);
    const result = await Event.create(requestbody)
    return res.status(HTTPStatus.CREATED).json(result);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

/**
 * @api {delete} /event/:id Delete a event
 * @apiDescription Delete a event if the author it's the right one
 * @apiName deleteEvent
 * @apiGroup Event
 *
 * @apiParam {String} id Event unique ID.
 *
 * @apiSuccess {Number} status Status of the Request.

 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * 200
 *
 * @apiErrorExample {json} Event not found
 *    HTTP/1.1 404 Not Found
 *
 */
export async function deleteEvent(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);
    await event.remove();
    return res.status(HTTPStatus.OK).json({});
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

/**
 * @api {put} /event/:id Update a event
 * @apiDescription Update a event if the author it's the right one
 * @apiName updateEvent
 * @apiGroup Event
 *
 * @apiParam {String} id Event unique ID.
 *
 * @apiParam (Body) {String} name Event title.
 * @apiParam (Body) {Date} startDate Event starting date (UNIX Timestamp).
 * @apiParam (Body) {Date} endDate Event ending date (UNIX Timestamp).
 *
 * @apiSuccess {String} name Event title.
 * @apiSuccess {Date} startDate Event start date.
 * @apiSuccess {Date} endDate Event end date.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *   "_id": "5b6427b515abcc5435743455",
 *   "name": "event",
 *   "startDate": "2018-08-16T18:15:34.000Z",
 *   "endDate": "2018-08-03T04:28:54.000Z"
 * }
 *
 * @apiErrorExample {json} Event not found
 *    HTTP/1.1 404 Not Found
 */
export async function updateEvent(req, res, next) {
  try {
    const body = filteredBody(req.body, WHITE_LIST.event.create)
    const result = await Event.findByIdAndUpdate(req.params.id, body, {new: true})
    if (!result) {
      return res.sendStatus(HTTPStatus.NOT_FOUND)
    }
    return res.status(HTTPStatus.OK).json(result)
  } catch (err) {
    console.log(err)
    return next(err)
  }
}
