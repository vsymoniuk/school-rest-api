const Auditorium = require('../models/Auditorium')
const handler = require('../utils/errorHandler')
const config = require('../config')

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
        const limit = config.pageLimit || process.env.PAGE_LIMIT
        const page = req.query.page || 1

        const auditoriums = await Auditorium.find()
            .skip(limit * page - limit)
            .limit(limit)
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