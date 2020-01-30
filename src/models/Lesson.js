const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    teacher: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        required: true,
    },
    class: {
        ref: 'classes',
            type: Schema.Types.ObjectId,
            required: true,
    },
    auditorium: {
        ref: 'auditoriums',
        type: Schema.Types.ObjectId,
        required: true,
    },
    lessonNumber: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('lessons', lessonSchema);