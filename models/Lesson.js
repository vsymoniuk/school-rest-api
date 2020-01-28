const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lessonSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    teacher: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    students: {
        ref: 'classes',
        type: Schema.Types.ObjectId
    },
    auditorium: {
        ref: 'auditoriums',
        type: Schema.Types.ObjectId
    },
    lessonNumber: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('lessons', lessonSchema)