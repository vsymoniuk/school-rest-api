require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_URI,
    jwt: process.env.JWT,
    pageLimit: +process.env.PAGE_LIMIT,
};