const express = require('express');

const { getAllCourses, getCourseById, addCourse, updateCourseById, deleteCourseById } = require('../controllers/courses');

const router = express.Router();

//已经在task路径下了，所以原来路径的‘/tasks’可以直接省略
router.get('', getAllCourses);
router.get('/:id', getCourseById);
router.post('', addCourse);
router.put('/:id', updateCourseById);
router.delete('/:id', deleteCourseById);

//app.use('/tasks', middleware, m2, m3);

//导出
module.exports = router;