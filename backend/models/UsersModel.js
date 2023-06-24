const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedpw: {
        type: String,
        required: true,
    }

})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel