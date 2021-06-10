const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
  _id: {
    type: String,
    uppercase: true,
    alias: 'code',
  },
  name: {
    type: String,
    require: true,
  },
  description: { 
    type: String,
    default: 'This is a description.'
  }
  }, 
  { //设置virtual属性可以在res中看到.
    //virtual属性只存在于get数据的时候
    toJSON: {
      virtuals: true
    },
    id: false
  }
  );

/* schema.virtual('code').get(function () {
  return this._id; //this指向实际获取的document，因此不用arrow fn
}); */

// Course -> courses
// register Course model in Mongoose
const courseModel = mongoose.model('Course', schema);

module.exports = courseModel;