
const { dayTask } = require("../models/tasks");


function notifyTodayTask(user) {
    return new Promise(async (resolve, reject) => {
        const date = new Date().toJSON().slice(0, 10);
        try {
            let taskPresent = await dayTask.findAllUsersTask(date);
            if (taskPresent) {
              resolve(taskPresent);
            } else {
              resolve(false);
            }
        } catch(e) {
            resolve(false);
        }
    })
}




module.exports = notifyTodayTask;