const express = require('express');

const studentsRoute = require('./students');
const coursesRoute = require('./courses');
const teachersRoute = require('./teachers');
const usersRoute = require('./users');


const router = express.Router();

router.use('/students', studentsRoute);
router.use('/teachers', teachersRoute);
router.use('/courses', coursesRoute);
router.use('/users', usersRoute);


module.exports = router;