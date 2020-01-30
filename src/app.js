const port = process.env.PORT || 5000;

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan')('dev');

const app = express();

const router = require('./routes/index');
require('./middleware/passport')(passport);
require('./db/index').connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan);
app.use(passport.initialize());

app.use('/api', router);

app.listen(port, () => console.log(`Server has been started on ${port}`));

module.exports = app;