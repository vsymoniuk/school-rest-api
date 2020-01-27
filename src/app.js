const mongoose = require('mongoose')
const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const app = express()

const config = require('./config')

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

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/lesson', require('./routes/lesson'))

module.exports = app