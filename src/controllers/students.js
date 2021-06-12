const Student = require('../models/student');
const Course = require('../models/course');


/* 
  function tryCatch(routeHandler) {
    return (req, res, next) => {
      try {
        routeHandler(req, res, next);
      } catch(e) {
        next(e);
      }
    }
  }
  将这个function挂载到routes中的每一个routehandler上
  目前相对来说最方便的是直接安装express—async-errors
 */

async function getAllStudents(req, res) {
  const students = await Student.find().exec();
  return res.json(students);
}

async function getStudentById(req, res) {
  const { id } = req.params;
  const student = await Student.findById(id).populate('courses','name').exec();//用populate取关联的数据
  if (!student) {
    return res.sendStatus(404);
  }
  return res.json(student);
}

async function addStudent (req, res) {
  const { firstName, lastName, gender, mobile, email } = req.body;

  const student = new Student({ firstName, lastName, gender, mobile, email });
  await student.save();
 /*  try {
    await student.save();
  } catch(e) {
    return res.send(e);

  } */ //一种抓取错误的方式
  //另一种：
  /* student.save((error, result) => {
    if (error) {
      next(e); //通过next把错误传到error handler中
    }
    res.status(201).json(result);
  }) */
  //第三种：用promise
  /* student.save().then((result) => {
    res.status(201).json(result);
  }).catch( error => {
    next(error);
  }) */
  return res.status(201).json(student);
}

async function updateStudentById(req, res) {
  const { id } = req.params;
  const { firstName, lastName, gender, mobile, email } = req.body;

  const student = await Student.findByIdAndUpdate(
    id,
    { firstName, lastName, gender, mobile, email },
    {new: true}
  ).exec();
  if (!student) {
    return res.sendStatus(404);
  }
  return res.json(student);

}
async function deleteStudentById(req, res) {
  const { id } = req.params;

  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
    return res.sendStatus(404);
  }
  await Course.updateMany({
    students: student._id
  }, {
    $pull: {
      students: student._id
    }
  })
  /* res.json(student); */
  return res.status(204).json(student);

}

// 跟course相关的routehandler
async function addStudentToCourse (req, res) {
  //get student ID, get course code
  const { id, code } = req.params;
  // find student
  const student = await Student.findById(id).exec();
  // find course
  const course = await Course.findById(code).exec();
  //check student or course exist
  if (!student || !course) {
    return res.sendStatus(404);
  }
  //check student is already enrolled
  student.courses.addToSet(course._id);
  course.students.addToSet(student._id);

    // add student to course
  await student.save();
  await course.save();
  // return update student or return 200/201
  return res.json(student);
}

function removeStudentFromCourse(req, res) {

} 

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudentById,
  deleteStudentById,
  addStudentToCourse,
  removeStudentFromCourse
}