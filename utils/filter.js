
const mongoose = require('../database/mongoose');
const { dayTask } = require('../models/dayTasks');


async function tasksAverage(user) {
    const d = new Date()
    d.setDate(d.getDate()-7)
    console.log('filter',user)
    const result = await dayTask.aggregate([
        { $match: { date: { $gt: d }, user: user } },
        { $project: {"_id": 0, "tasks": 1}},
        { $unwind: "$tasks"},
        { $group: { "_id" :"$tasks.Task_Type", "average": {$avg: "$tasks.Duration"}}},
        { $project: { "_id":0,"Task": "$_id", "Average": { $round: ["$average", 0]} }}
    ]).exec();
    const final = Promise.all([result])
    return new Promise((resolve, reject) => {
        final.then((data)=> resolve(data[0])).catch((e)=> reject('e',e))
    })
}


async function taskSum(user) {
    const d = new Date()
    d.setDate(d.getDate()-7)
    console.log('filter',user)
    const result = await dayTask.aggregate([
        { $match: { date: { $gt: d }, user: user } },
        { $project: { _id: 0, tasks: 1 } },
        { $unwind: "$tasks" },
        { $group: { _id: "$tasks.Task_Type", sum: { $sum: "$tasks.Duration" } } },
        { $project: { _id: 0, Task: "$_id", "Time_Spent": { $round: ["$sum", 0] } } },
    ]).exec();
    const final = Promise.all([result])
    return new Promise((resolve, reject) => {
        final.then((data)=> resolve(data[0])).catch((e)=> reject('e',e))
    })
}


module.exports = { tasksAverage, taskSum }