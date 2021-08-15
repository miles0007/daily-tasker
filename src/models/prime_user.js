
const mongoose = require('mongoose');
const User = require('./user');


const primeUserSchema = mongoose.Schema({
    user: [{
        type: String
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

// primeUserSchema.statics.todayList = async function() {
    
// }

const primeUser = mongoose.model('primeUser', primeUserSchema);

module.exports = primeUser;