
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const auth = async function(req, res, next) {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JSWEB_TOKEN);

        // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!decoded) {
            throw new Error('No User has been found');
        }
        req.token = token;
        req.user_id = decoded._id;
        console.log(req.user_id,'User ID')
        next();
    } catch(e) {
        console.log(e);
        return res.status(402).send('Please Authenticate');
    }
}



module.exports = auth;