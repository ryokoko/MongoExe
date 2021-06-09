const express = require('express');

const studentsRoute = require('./students');
const coursesRoute = require('./courses');
const teachersRoute = require('./teachers');

const router = express.Router();

router.use('/students', studentsRoute);
router.use('/teachers', teachersRoute);
router.use('/courses', coursesRoute);

module.exports = router;