const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
  _id: {
    type: String,
    alias: 'studentID',
  },
  fName: {
    type: String,
    require: true,
  },
  lName: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  }, 
  //让__v的值不显示在结果中
  __v: {
    type: Number,
    select: false,
  }
}, 
{
  toJSON: {
    virtuals: true,
  }
}
);
//通过alias让_id的alias为studentID
/* schema.virtual('studentId').get(function () {
  return this._id;
}) */
schema.virtual('fullName').get(function() {
  return this.fName.concat(this.lName);
})

const studentModel = mongoose.model('Student', schema);

module.exports = studentModel;