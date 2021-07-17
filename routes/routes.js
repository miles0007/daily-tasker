
const express = require('express');
const { home:homeRoute, makeDailyTask, insertTask } = require('../views/main');

const router = express.Router();


router.get('/', homeRoute)
router.post('/add/task', makeDailyTask)
router.post('/insert/task', insertTask)



module.exports = router;