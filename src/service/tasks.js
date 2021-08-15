
const { dayTask } = require("../models/tasks");
const notifyTodayTask = require("../utils/day_validate");
const { tasksAverage, taskSum } = require("../utils/filter");
const {validateSchema, tools } = require("../utils/tools")

const curr_date = () => new Date().toJSON().slice(0,10);

const home = (req, res) => {
    res.send('<h1>Daily Task Tracker</h1>')
}

const makeDailyTask = async (req, res) => {
    const date = req.body.date || curr_date();
    const tasks = req.body.tasks || [];

    const data_content = validateSchema("addschema", req.body);
    if (data_content) {
        try{
            let taskPresent = await dayTask.findDayTaskByUser(req.user_id, date);
            if (taskPresent) {
                res.json({"message": "Already Present Try to insert", "code": 201})
            } else {
                const userTaskToday = new dayTask({ user: req.user_id, date, tasks });
                await userTaskToday.save()
                res.json({"message": "success", "code": 200})
            }
        } catch (e) {
            res.json({ "message": e, code: 400 });
        }
    } else {
        res.json({ message: data_content[1], code: 401 });
    }
}


const insertTask = async (req, res) => {
    const body = Object.assign({}, req.body)
    delete body.user

    const data_content = validateSchema("insertschema",req.body)
    if (data_content) {
        try {
            let taskObj = await dayTask.findDayTaskByUser(req.user_id, req.body.date||curr_date());
            if (taskObj) {
                for (let task=0; task < body.tasks.length; task++) {
                    taskObj.tasks.push(body.tasks[task])
                    await taskObj.save()
                }
                res.json({"message":"Action of Insertion Success", "code":200})
            } else {
                res.json({"message":"Task is not found database", "code": 404})
            }
        } catch(e) {
            res.json({ message: e, code: 401 })
        }
    } else {
        res.json({ message: data_content[1], code: 401})
    }   
}

const getAccumulatedList = async (req, res) => {
    const result = await tasksAverage(req.user_id)
    res.json({result: result})
}

const getTimingList = async (req, res) => {
    const result = await taskSum(req.user_id)
    res.json({result: result})
}

const getTask = async (req, res) => {
    let user = req.query.user;
    let task = await notifyTodayTask(user);
    console.log(JSON.stringify(task));
    res.json(task)
}

const missionAdd = async (req, res) => {

}


module.exports = { 
    home, makeDailyTask, insertTask, getAccumulatedList, 
    getTimingList, getTask, missionAdd }