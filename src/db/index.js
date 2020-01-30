const mongoose = require('mongoose');
const config = require('../config');

module.exports.connect = () => {
    mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then(() => console.log('Mongo connected.'))
        .catch(error => console.log(error));
};