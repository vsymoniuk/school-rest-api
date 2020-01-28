const mongoose = require('mongoose')
const Schema = mongoose.Schema

const auditoriumSchema = new Schema({
    corpsNumber: Number,
    corpsName: String,
    floor: Number,
    auditoriumNumber: Number,
    places: Number
})

module.exports = mongoose.model('auditoriums', auditoriumSchema)