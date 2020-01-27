const mongoose = require('mongoose')
const Schema = mongoose.Schema

const classSchema = new Schema({
    name: {
        type: String
    },
    pupils: {
        ref: 'users',
        type: [Schema.Types.ObjectId]
    },
    curator: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('classes', classSchema)