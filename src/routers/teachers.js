const express = require('express');

const { getAllTeachers, getTeacherById, addTeacher, updateTeacherById, deleteTeacherById } = require('../controllers/teachers');

const router = express.Router();


router.get('', getAllTeachers);
router.get('/:id', getTeacherById);
router.post('', addTeacher);
router.put('/:id', updateTeacherById);
router.delete('/:id', deleteTeacherById);


//导出
module.exports = router;