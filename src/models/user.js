
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const { encrypt, tools } = require("../utils/tools");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        validate: {
            validator: function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: "Please enter a valid email"
        }

    },
    tokens: [{
        token: {
            type: String,
            required: false
        } 
    }]
});

userSchema.statics.LoginUser = async function(email, password) {
    const hashedPassword = tools.Encrypt(password);
    const user = await User.findOne({ email: email, password: hashedPassword });

    console.log('I am user', user)
    if (user) {
        return user;
    }
    return false;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JSWEB_TOKEN);
    user.tokens = user.tokens.concat({ token });
    await user.save()
    return token;
}

const User = mongoose.model('User',userSchema);

module.exports = User;