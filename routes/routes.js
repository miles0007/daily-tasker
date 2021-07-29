
const express = require('express');
const { home:homeRoute, makeDailyTask, insertTask, getAccumulatedList, getTimingList } = require('../views/main');

const router = express.Router();


router.get('/', homeRoute)
router.post('/add/task', makeDailyTask)
router.post('/insert/task', insertTask)
router.get('/report', getAccumulatedList)
router.get('/sumReport', getTimingList)



module.exports = router;