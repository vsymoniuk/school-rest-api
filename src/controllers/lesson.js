const Lesson = require('../../models/Lesson')
const handler = require('../middleware/errorHandler')

module.exports.create = async function(req, res) {
    try {

        if (!req.body.name) {
            res.status(400).json({
                success: false,
                message: 'field name is required'
            })
            return
        } else if (!req.body.lessonNumber) {
            res.status(400).json({
                success: false,
                message: 'field lessonNumber is required'
            })
            return
        }

        const lesson = new Lesson({
            name: req.body.name,
            teacher: req.body.teacher,
            students: req.body.class,
            auditorium: req.body.auditorium,
            lessonNumber: req.body.lessonNumber
        })

        await lesson.save()
        res.status(201).json(lesson)

    } catch (e) {
        handler(res, e)
    }
}

module.exports.getById = async function(req, res) {
    try {
        const lesson = await Lesson.findById(req.params.id)
        res.status(200).json(lesson)
    } catch (e) {
        handler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {

        let updated = {}

        Position.findOne({
            _id: req.params.id
        }).then(position => {
            updated.name = req.body.name || position.name
            updated.teacher = req.body.teacher || position.teacher
            updated.students = req.body.students || position.students
            updated.auditorium = req.body.auditorium || position.auditorium
            updated.lessonNumber = req.body.lessonNumber || position.lessonNumber
        })


        const lesson = await Lesson.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: updated
        }, {
            new: true
        })

        res.status(200).json(lesson)

    } catch (e) {
        handler(res, e)
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
        handler(res, e)
    }
}