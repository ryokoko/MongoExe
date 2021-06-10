const Student = require('../models/student');


async function getAllStudents(req, res) {
  const students = await Student.find().exec();
  return res.json(students);
}

async function getStudentById(req, res) {
  const { id } = req.params;
  const student = await Student.findById(id);
  if (!student) {
    return res.sendStatus(404);
  }
  return res.json(student);
}

async function addStudent (req, res) {
  const { studentID, name, gender, mobile, address } = req.body;

  const student = new Student({ _id: studentID, name, gender, mobile, address });
  await student.save();
  return res.status(201).json(student);
}

async function updateStudentById(req, res) {
  const { id } = req.params;
  const { name, gender, mobile, address } = req.body;

  const student = await Student.findByIdAndUpdate(
    id,
    { name, gender, mobile, address },
    {new: true}
  );
  if (!student) {
    return res.sendStatus(404);
  }
  return res.json(student);

}
async function deleteStudentById(req, res) {
  const { id } = req.params;

  const student = await Student.findByIdAndDelete(id);
  if (!student) {
    return res.sendStatus(404);
  }
  /* res.json(student); */
  return res.status(204).json(student);

}

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudentById,
  deleteStudentById
}