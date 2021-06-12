//import Course model
const Course = require('../models/course');
const Joi = require('joi');

const Student = require('../models/student');

async function getAllCourses(req, res) {
  // find a certain course
  //exec() 告诉代码，query在这里终止。如果不写就会做判断是否终止
  const courses = await Course.find().exec(); // 异步操作。新项目用这个方法

  //Course.findById().then().catch()  -》 旧项目用
  //Course.findById((error, data) => {  -》 再旧的项目用
  //   
  // })
  return res.json(courses);

}

async function getCourseById(req, res) {
  const { id } = req.params;
  const course = await Course.findById(id).populate('students').exec();
  if(!course) {
    return res.sendStatus(404);
  }
  return res.json(course);

}

async function addCourse (req, res) {
  //validate data
  const schema = Joi.object({
    name: Joi.string().min(2).max(10).required(),
    code: Joi.string().regex(/^[a-zA-Z0-9]+$/).required(),
    description: Joi.string(),
  })
  const { code, name, description } = await schema.validateAsync(req.body, {
    allowUnknown: true, //允许接收不存在（未经定义）的数据
    stripUnknown: true, //允许删掉不存在的数据
    abortEarly: true, //允许只要出现第一个字符不符合，则立即返回错误
  })
  // create new course document through Course model
 
  const existCourse = await Course.findById(code).exec();
  if (existCourse) {
    // duplicate course code
    return res.sendStatus(409);
  }
  const course = new Course({ _id: code, name, description });
  await course.save();
  return res.status(201).json(course);

}

async function updateCourseById(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  const course = await Course.findByIdAndUpdate(id, { name, description }, {new: true}); //返回更新之前的。如果要更新之后的需要加new: true
  if (!course) {
    return res.sendStatus(404);
  }
  return res.json(course);

}
async function deleteCourseById(req, res) {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(
    id //返回一个删掉的id
  )
  if (!course) {
    return res.sendStatus(404);
  }
  // db.collections.updateMany 逻辑一样
  await Student.updateMany({
    courses: course._id
  }, {
    $pull: {
      courses: course._id,
    }
  })
  res.json(course);
  return res.sendStatus(204);
  

}

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCourseById
}