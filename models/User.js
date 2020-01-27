const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    enrollingYear: {
        type: Number,
        default: new Date().getFullYear()
    },
    role: {
        type: String,
        default: 'pupil'
    }
})

module.exports = mongoose.model('users', userSchema)