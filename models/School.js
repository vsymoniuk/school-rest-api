const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schoolSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    classes: {
        ref: 'classes',
        type: [Schema.Types.ObjectId],
        default: []
    },
    director: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    auditoriums: {
        ref: 'auditoriums',
        type: [Schema.Types.ObjectId],
        default: []
    },
    schoolBio: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('schools', schoolSchema)