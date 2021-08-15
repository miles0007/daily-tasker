
const User = require("../models/user");
const { tools } = require("../utils/tools");


const createUser = async (req, res) => {
    let password = tools.Encrypt(req.body.password);
    if (password) {
        req.body.password = password;
        const user = new User(req.body);
        try {
            await user.save()
            res.json({'message': 'user created successfully', user })
        } catch(e) {
            console.log(e)
            res.json({'error': e})
        }
    } else {
        res.status(400).json({'error':'Your password is not an valid one.'})
    }
    
}


const loginUser = async (req, res) => {
    let userFound = await User.LoginUser(req.body.email, req.body.password);
    if (userFound) {
        const token = await userFound.generateAuthToken();
        console.log('Token has been added successfully',token)
        res.json({'message': 'Logged successfully', token});
    } else {
        res.json({'message': 'Invalid user credentials'});
    }
}

module.exports = { createUser, loginUser }