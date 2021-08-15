
const express = require('express');
const auth = require('../middlewares/auth');
const { home:homeRoute, makeDailyTask, insertTask, getAccumulatedList, getTimingList, getTask, missionAdd } = require('../service/tasks');
const { createUser, loginUser } = require('../service/user');
const { url } = require('../service/url');
const router = express.Router();


router.get('/', homeRoute)
router.post('/add/task', auth, makeDailyTask)
router.post('/insert/task', auth, insertTask)
router.get('/report', auth, getAccumulatedList)
router.get('/sumReport', auth, getTimingList)
router.get('/present', auth, getTask)
router.post('/register', createUser)
router.post('/login', loginUser)

router.get('/mission/:mission_id', auth, missionAdd)
router.post("/generate/url", auth, url.uniqueUrl);
router.get("/primeList/", auth, url.mailOperation);



module.exports = router;