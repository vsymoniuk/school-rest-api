const User = require('../models/User')
const handler = require('../middleware/errorHandler')
const config = require('../config')

module.exports.getAll = async function(req, res) {
    try {

        const limit = config.pageLimit || process.env.PAGE_LIMIT
        const page = req.query.page || 1

        const users = await User.find()
            .skip(limit * page - limit)
            .limit(limit)
        res.status(200).json(users)
    } catch (e) {
        handler.catch(res, e)
    }
}

module.exports.delete = async function(req, res) {
    try {
        await User.remove({
            _id: req.params.id
        })
        res.status(200).json({
            message: 'user was deleted'
        })
    } catch (e) {
        handler.catch(res, e)
    }
}