const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: String,
    lastName: String,
    password: {
        type: String,
        required: true,
    },
    enrollingYear: {
        type: Number,
        default: new Date().getFullYear(),
    },
    role: String,
});

module.exports = mongoose.model('users', userSchema);