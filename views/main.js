
const { dayTask } = require("../models/dayTasks")
const validateSchema = require("../utils/tools")

const curr_date = () => new Date().toJSON().slice(0,10);

const home = (req, res) => {
    res.send('<h1>Daily Task Tracker</h1>')
}

const makeDailyTask = async (req, res) => {
    const user = req.body.user;
    const date = req.body.date || curr_date();

    const data_content = validateSchema("addschema", req.body);
    if (data_content) {
        try{
            let taskPresent = await dayTask.findDayTaskByUser(user, date);
            if (taskPresent) {
                res.json({"message": "Already Present Try to insert", "code": 201})
            } else {
                const userTaskToday = new dayTask({ user, date });
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
    const user = body.user
    delete body.user

    const data_content = validateSchema("insertschema",req.body)
    if (data_content) {
        try {
            let taskObj = await dayTask.findDayTaskByUser(user, req.body.date||curr_date());
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

module.exports = { home, makeDailyTask, insertTask }