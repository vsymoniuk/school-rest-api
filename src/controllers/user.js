const User = require('../../models/User')
const handler = require('../middleware/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        const users = await User.find()
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