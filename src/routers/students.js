const express = require('express');
const { getAllStudents, 
  getStudentById, 
  addStudent, 
  updateStudentById, 
  deleteStudentById,
  addStudentToCourse,
  removeStudentFromCourse } = require('../controllers/students');

const router = express.Router();


router.get('', getAllStudents);
router.get('/:id', getStudentById);
router.post('', addStudent);
router.put('/:id', updateStudentById);
router.delete('/:id', deleteStudentById);

router.post('/:id/courses/:code', addStudentToCourse);
router.delete('/:id/courses/:code', removeStudentFromCourse);


//导出
module.exports = router;