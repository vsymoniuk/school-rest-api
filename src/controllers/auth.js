const User = require('../../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const handler = require('../middleware/errorHandler')

module.exports.login = async function(req, res) {
    try {

    } catch (e) {
        handler(res, e)
    }
}

module.exports.register = async function(req, res) {
    try {

    } catch (e) {
        handler(res, e)
    }
}