const Class = require('../../models/Class')
const User = require('../../models/User')
const handler = require('../middleware/errorHandler')

module.exports.create = async function(req, res) {
    try {

        const curator = await User.findById(req.body.curator)

        if (!req.body.name) handler.response(res, 400, 'field name can`t be empty')
        else if (!curator) handler.response(res, 400, 'class can`t exist without a curator')
        else if (curator.role !== 'teacher') handler.response(res, 400, 'only a teacher can be curator')
        else if (!req.body.pupils) handler.response(res, 400, 'class must contain at list one pupil')

        let clas = new Class(req.body)
        await clas.save()
        res.status(201).json(clas)

    } catch (e) {
        handler.catch(res, e)
    }
}

module.exports.getAll = async function(req, res) {
    try {

    } catch (e) {
        handler.catch(res, e)
    }
}


module.exports.getById = async function(req, res) {
    try {

    } catch (e) {
        handler.catch(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {

    } catch (e) {
        handler.catch(res, e)
    }
}

module.exports.delete = async function(req, res) {
    try {

    } catch (e) {
        handler.catch(res, e)
    }
}