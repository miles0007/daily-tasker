
const mongoose = require('mongoose');

const dayTaskSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    tasks: [{
        Task_Name: {
            type: String,
            required: true
        },
        Task_Type: {
            type: String,
            required: true
        },
        Duration: {
            type: Number,
            required: true,
            default: 0
        }
    }]
})

dayTaskSchema.statics.findDayTaskByUser = async function (username, date) {
  const todayTask = await dayTask.findOne({ user: username, date: date });
  return todayTask;
};

const dayTask = mongoose.model('dayTasks',dayTaskSchema);


module.exports = { dayTask }