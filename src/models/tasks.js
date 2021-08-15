
const mongoose = require('mongoose');

const dayTaskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
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

dayTaskSchema.statics.findDayTaskByUser = async function (user_id, date) {
  const todayTask = await dayTask.findOne({ user: user_id, date: date });
  return todayTask;
};

dayTaskSchema.statics.findAllUsersTask = async function(date) {
    const tasks = await dayTask.find({ date: date});
    return tasks;
} 

const dayTask = mongoose.model('dayTasks',dayTaskSchema);


module.exports = { dayTask }