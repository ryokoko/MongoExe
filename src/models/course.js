const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: {
    type: String,
    uppercase: true
  },
  name: {
    type: String,
    require: true,
  },
  description: { 
    type: String,
    default: 'This is a description.'
  }
});

schema.virtual('code').get(function () {
  return this._id; //this指向实际获取的document，因此不用arrow fn
});

// Course -> courses
// register Course model in Mongoose
const courseModel = mongoose.model('Course', schema);

module.exports = courseModel;