const mongoose = require('mongoose')
const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const morgan = require('morgan')('dev')
const app = express()

const config = require('./config')
require('./middleware/passport')(passport)

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env["MONGO_URI"] || config.mongoURI)
    .then(() => console.log('Mongo connected.'))
    .catch(error => console.log(error))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(morgan)
app.use(passport.initialize())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/lesson', require('./routes/lesson'))
app.use('/api/auditorium', require('./routes/auditorium'))
app.use('/api/class', require('./routes/class'))
app.use('/api/user', require('./routes/user'))

module.exports = app