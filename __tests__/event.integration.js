/*
 * @Author: Matheus Rezende
 * @Date: 2018-12-16 10:20:31
 * @Last Modified by:   matheus.rezende
 * @Last Modified time: 2018-12-16 10:20:31
 */
import HTTPStatus from 'http-status';
import mongoose from 'mongoose'
import request from 'supertest'

import app from '../src'

describe('Test /api/event endpoints', () => {
  const mockEvent = {
    name: 'Cool Event',
    startDate: '1970-01-02T10:12:03.123Z',
    endDate: '1970-01-27T18:32:03.123Z',
  }
  describe('Event list GET', () => {
    it('testing /api/event GET', (done) => request(app).get('/api/event')
      .then((result) => {
        expect(result.statusCode).toBe(HTTPStatus.OK)
        expect(Array.isArray(result.body)).toBeTruthy()
        done()
      }))
  })
  
  describe('Event detail GET', () => {
    it('testing /api/event/:id GET:: Should return bad request', () => request(app)
      .get('/api/event/123')
      .then((result) => {
        expect(result.statusCode).toBe(HTTPStatus.BAD_REQUEST)
      }))

    it('testing /api/event/:id GET:: Should return not found', () => request(app)
      .get(`/api/event/${new mongoose.Types.ObjectId()}`)
      .then((result) => {
        expect(result.statusCode).toBe(HTTPStatus.NOT_FOUND)
      }))

    it('testing /api/event/:id GET:: Should return existing document', () => request(app)
      .get('/api/event/5c15b131eab47d2306ef67e1')
      .then((result) => {
        expect(result.statusCode).toBe(HTTPStatus.OK)
        expect(typeof result.body).toBe('object')
      }))
  })

  describe('Event create POST', () => {
    it('testing /api/event POST:: Should return validation error', () => request(app)
      .post('/api/event')
      .send({})
      .then((result) => {
        expect(result.statusCode).toBe(HTTPStatus.BAD_REQUEST)
        expect(result.body.message).toBe('validation error')
        expect(result.body.errors.name).toBe('name is required')
        expect(result.body.errors.startDate).toBe('startDate is required')
        expect(result.body.errors.endDate).toBe('endDate is required')
      }))

    it('testing /api/event POST:: Should return created document', () => request(app)
      .post('/api/event')
      .send(mockEvent)
      .then((result) => {
        expect(result.statusCode).toBe(HTTPStatus.CREATED)
      }))
  })

  describe('Event update PUT', () => {
    it('testing /api/event/:id PUT:: Should return not found', () => request(app)
      .put(`/api/event/${new mongoose.Types.ObjectId()}`)
      .send(mockEvent)
      .then((result) => {
        expect(result.statusCode).toBe(HTTPStatus.NOT_FOUND)
      }))

    it('testing /api/event:id PUT:: Should return updated document', () => request(app)
      .put(`/api/event/5c15b152eab47d2306ef67e2`)
      .send({
        name: 'Name to be changed',
        startDate: '2018-12-16T01:58:31.066Z',
        endDate: '2459-07-26T19:45:10.699Z',
      })
      .then((result) => {
        expect(result.statusCode).toBe(HTTPStatus.OK)
        expect(result.body.name).toBe('Name to be changed')
      }))
  })

})
