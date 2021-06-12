const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema(
  {
  firstName: {
    type: String,
    required: true,
    trim: true, //输入额外空格后可以把前后空格都删掉，不会删除中间的空格
    minlength: 2
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (emailInput) => {
        //用RegEx验证，joi
        //validator -> frontend validation npm
        /* const validation = Joi.string().email().validate(emailInput);
        const { error } = validation;

        //如果error有值，则校验失败
        if (error) {
          return false; //验证失败，说明error存在
        }
        else {
          return true; //验证成功，说明error不存在
        } */
        return !Joi.string().email().validate(emailInput).error;

      },
      msg: 'Invalid email format.'
    }
  },
  courses: [{ type: String, ref: 'Course' }],
  //让__v的值不显示在结果中，为了保证数据修改后的consistency。
  //对于某一个字段如果不想让他显示，select变成false
  __v: {
    type: Number,
    select: false,
  }
}, 
{ //添加时间戳针对添加的新数据。updateAt是需要.save()这个方法调用的
  timestamps: true,
  //显示virtual属性
  toJSON: {
    virtuals: true,
  }
}
);
//通过alias让_id的alias为studentID
/*  schema.virtual('studentId').get(function () {
  return this._id;
})  */
/* schema.virtual('fullName').get(function() {
  return this.fName.concat(this.lName);
}) */


const studentModel = mongoose.model('Student', schema);

module.exports = studentModel;