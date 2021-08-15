
const uuid = require("uuid");
const primeUser = require("../models/prime_user");
const Url = require("../models/url");
const User = require("../models/user");
const { filterObject, notificationProcess } = require("../utils/tools");


const url = {}

const urlGenerator = function() {
    let unique_id = uuid.v1();
    return unique_id
}


const collectAllUsers = async function() {
    const users = await User.find();
    let arr_users = []
    users.forEach((user) => arr_users.push({user: user._id, email: user.email}));
    return arr_users;
}

const generateUrls = function() {
    return new Promise(async (resolve, reject) => {
        try {
            // generate prime users of the day
            
            const users = await collectAllUsers();
            const onlyUser = users.map(user => user.user)
            const prime_user_of_day = new primeUser({ user: onlyUser });
            await prime_user_of_day.save()

            for (let i=0; i<users.length; i++) {
                let id = urlGenerator();
                console.log(typeof users[i].user)
                let id_exist = await Url.isUrlExist(id);
                while (id_exist) {
                  id = urlGenerator();
                  id_exist = await Url.isUrlExist(id);
                }
                console.log({ url_id: id, user: users[i].user })
                let url = new Url({ url_id: id, user: users[i].user.toString(), timestamp: Date.now() });
                console.log('url generated', url)
                await url.save();
            }
        } catch(e) {
            console.log('error occured in generate urls', e);
            resolve(false);
        }
        resolve(true);
    })
}


url.uniqueUrl = async function(req, res) {
    generateUrls();
    let id = urlGenerator();
    let id_exist = await Url.isUrlExist(id);
    while (id_exist) {
        id = urlGenerator();
        id_exist = await Url.isUrlExist(id);
    }
    let url = new Url({url_id: id, user: req.user_id});
    await url.save()
    if (url) {
        res.send('url added success')
    } else {
        res.send('url not added')
    }
}

url.mailOperation = async function(req, res) {
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);

    const urlUsers = await Url.find({ timestamp: { $gte: start, $lt: end } })
        .populate('user').exec();

    notificationProcess(urlUsers);
    res.status(200).json({ message: 'ok', notification: 'processing'})
}


// generateUrls() for creating url with users list

module.exports = { urlGenerator, url };