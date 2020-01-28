const Class = require('../../models/Class')
const User = require('../../models/User')
const handler = require('../middleware/errorHandler')

module.exports.create = async function(req, res) {
    try {

        const curator = await User.findById(req.body.curator)
        if (!curator) {
            handler.response(res, 400, 'class can`t exist without a curator')
            return
        } else
        if (curator.role !== 'teacher') {
            handler.response(res, 400, 'only a teacher can be curator')
            return
        } else if (!req.body.pupils) {
            handler.response(res, 400, 'class must contain at list one pupil')
            return
        }

        let clas = new Class(req.body)
        await clas.save()
        res.status(201).json(clas)

    } catch (e) {
        handler.catch(res, e)
    }
}

module.exports.getAll = async function(req, res) {
    try {
        const classes = await Class.find()
            .populate({ path: 'pupils', model: User })
            .populate({ path: 'curator', model: User })
        res.status(200).json(classes)
    } catch (e) {
        handler.catch(res, e)
    }
}


module.exports.getById = async function(req, res) {
    try {
        const clas = await Class.findById(req.params.id)
            .populate({ path: 'pupils', model: User })
            .populate({ path: 'curator', model: User })
        if (!clas) {
            handler.response(res, 404, 'class not found')
            return
        }
        res.status(200).json(clas)

    } catch (e) {
        handler.catch(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        let updated = req.body

        const clas = await Class.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: updated
        }, {
            new: true
        })

        res.status(200).json(clas)
    } catch (e) {
        handler.catch(res, e)
    }
}

module.exports.delete = async function(req, res) {
    try {
        await Class.remove({
            _id: req.params.id
        })
        res.status(200).json({
            message: 'class was deleted'
        })
    } catch (e) {
        handler.catch(res, e)
    }
}