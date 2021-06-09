//import Course model
const Course = require('../models/course');

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
  const course = await Course.findById(id);
  if(!course) {
    return res.sendStatus(404);
  }
  return res.json(course);

}

async function addCourse (req, res) {
  const { code, name, description } = req.body;
  // create new course document through Course model
  try{
  const course = new Course({ _id: code, name, description });
  await course.save();
  return res.status(201).json(course);}
  catch (e) {
    console.log(e.message);
  }
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