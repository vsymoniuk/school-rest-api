const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lessonSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    teacher: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        require: true
    },
    class: {
        ref: 'classes',
            type: Schema.Types.ObjectId,
            require: true
    },
    auditorium: {
        ref: 'auditoriums',
        type: Schema.Types.ObjectId,
        require: true
    },
    lessonNumber: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('lessons', lessonSchema)