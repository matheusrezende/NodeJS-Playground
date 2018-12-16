/*
 * @Author: Matheus Rezende
 * @Date: 2018-08-09 16:28:39
 * @Last Modified by: matheus.rezende
 * @Last Modified time: 2018-12-16 08:58:05
 */

import mongoose, {Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const EventSchema = new Schema(
  {
    name: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
  },
  {timestamps: true},
);

EventSchema.index({
  location: '2dsphere',
})
EventSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});


EventSchema.statics = {};

EventSchema.methods = {
  /**
   * Parse the post in format we want to send.
   *
   * @public
   * @returns {Post} Post Object
   */
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  },
};


/*  eslint-disable */
let EventModel;

try {
  EventModel = mongoose.model('Event');
} catch (e) {
  EventModel = mongoose.model('Event', EventSchema);
}


export default EventModel;
