const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
});

/* schema.virtual('code').get(function () {
  return this._id; //this指向实际获取的document，因此不用arrow fn
}); */

const userModel = mongoose.model('User', schema);

module.exports = userModel;