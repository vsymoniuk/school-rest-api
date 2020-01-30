const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    pupils: {
        ref: 'users',
        type: [Schema.Types.ObjectId],
        required: true,
    },
    curator: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        required: true,
    },
});

module.exports = mongoose.model('classes', classSchema);