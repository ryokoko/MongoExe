const express = require('express');
const { getAllStudents, getStudentById, addStudent, updateStudentById, deleteStudentById } = require('../controllers/students');

const router = express.Router();


router.get('', getAllStudents);
router.get('/:id', getStudentById);
router.post('', addStudent);
router.put('/:id', updateStudentById);
router.delete('/:id', deleteStudentById);


//导出
module.exports = router;