/*
 * @Author: Matheus Rezende
 * @Date: 2018-06-20 22:59:33
 * @Last Modified by: matheus.rezende
 * @Last Modified time: 2018-12-16 08:43:09
 */
import faker from 'faker';

import Event from '../models/event.model'

export async function eventSeed(count) {
  const events = [];

  Array.from({length: count || 10}).map(() => {
    const fakeUser = {
      name: faker.name.firstName(),
      startDate: faker.date.future(),
      endDate: faker.date.future(),
    };
    return events.push(fakeUser);
  });

  return Event.insertMany(events);
}

export async function deleteEventSeed() {
  try {
    return await Event.remove();
  } catch (e) {
    return e;
  }
}
