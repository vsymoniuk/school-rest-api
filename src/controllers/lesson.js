const Lesson = require('../../models/Lesson')
const Auditorium = require('../../models/Auditorium')
const Class = require('../../models/Class')
const User = require('../../models/User')
const handler = require('../middleware/errorHandler')

module.exports.create = async function(req, res) {
    try {

        if (!req.body.class) {
            handler.response(res, 400, 'field class can`t be empty')
            return
        } else if (!req.body.auditorium) {
            handler.response(res, 400, 'field auditorium can`t be empty')
            return
        }

        const lessonNumber = req.body.lessonNumber
        const clas = await Class.findById(req.body.class)
        const auditorium = await Auditorium.findById(req.body.auditorium)

        if (lessonNumber > 8 || lessonNumber < 1) {
            handler.response(res, 400, 'ivalid lesson number')
            return
        } else if (auditorium.places < clas.pupils.length) {
            console.log(auditorium)
            handler.response(res, 400, `auditorium ${auditorium.corpsName || auditorium.corpsNumber} doesn't have enough places for ${clas.name} `)
            return
        }

        const lesson = new Lesson(req.body)

        await lesson.save()
        res.status(201).json(lesson)

    } catch (e) {
        handler.catch(res, e)
    }
}

module.exports.getAll = async function(req, res) {
    try {
        const lessons = await Lesson.find()
        res.status(200).json(lessons)
    } catch (e) {
        handler.catch(res, e)
    }
}


module.exports.getById = async function(req, res) {
    try {
        const lesson = await Lesson.findById(req.params.id)
        if (!lesson) {
            handler.response(res, 404, 'lesson not found')
            return
        }
        res.status(200).json(lesson)
    } catch (e) {
        handler.catch(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {


        // if (req.body.name === '') handler.response(res, 400, 'field name can`t be empty')
        // else if (!req.body.lessonNumber) handler.response(res, 400, 'field lessonNumber can`t be empty')

        let updated = req.body


        const lesson = await Lesson.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: updated
        }, {
            new: true
        })

        res.status(200).json(lesson)

    } catch (e) {
        handler.catch(res, e)
    }
}

module.exports.delete = async function(req, res) {
    try {

        await Lesson.remove({
            _id: req.params.id
        })
        res.status(200).json({
            message: 'lesson was deleted'
        })

    } catch (e) {
        handler.catch(res, e)
    }
}