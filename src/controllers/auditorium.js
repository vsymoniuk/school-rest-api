const Auditorium = require('../../models/Auditorium')
const handler = require('../middleware/errorHandler')

module.exports.create = async function(req, res) {
    try {
        const auditorium = new Auditorium(req.body)
        await auditorium.save()
        res.status(201).json(auditorium)
    } catch (e) {
        handler.catch(res, e)
    }
}

module.exports.getAll = async function(req, res) {
    try {
        const auditoriums = await Auditorium.find()
        res.status(200).json(auditoriums)
    } catch (e) {
        handler.catch(res, e)
    }
}


module.exports.getById = async function(req, res) {
    try {
        const auditorium = await Auditorium.findById(req.params.id)
        if (!auditorium) {
            handler.response(res, 404, 'auditorium not found')
            return
        }
        res.status(200).json(auditorium)
    } catch (e) {
        handler.catch(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        let updated = req.body

        const auditorium = await Auditorium.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: updated
        }, {
            new: true
        })

        res.status(200).json(auditorium)
    } catch (e) {
        handler.catch(res, e)
    }
}

module.exports.delete = async function(req, res) {
    try {
        await Auditorium.remove({
            _id: req.params.id
        })
        res.status(200).json({
            message: 'auditorium was deleted'
        })
    } catch (e) {
        handler.catch(res, e)
    }
}