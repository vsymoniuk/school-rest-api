const User = require('../../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const handler = require('../middleware/errorHandler')

module.exports.register = async function(req, res) {
    try {
        const userCandidate = await User.findOne({
            email: req.body.email
        })

        if (!req.body.email) {
            res.status(400).json({
                success: false,
                message: 'email can not be empty'
            })
            return
        } else if (!req.body.password) {
            res.status(400).json({
                success: false,
                message: 'password can not be empty'
            })
            return
        } else if (userCandidate) {
            res.status(409).json({
                messgae: 'this email is already taken'
            })
            return
        }

        const salt = bcryptjs.genSaltSync(10)
        const password = req.body.password

        const user = new User({
            email: req.body.email,
            password: bcryptjs.hashSync(password, salt),
            firstName: req.body.firstName ? req.body.firstName : '',
            lastName: req.body.lastName ? req.body.lastName : '',
            role: req.body.role ? req.body.role : 'pupil'
        })

        await user.save()
        res.status(201).json(user)

    } catch (e) {
        handler(res, e)
    }
}

module.exports.login = async function(req, res) {
    try {
        const userCandidate = await User.findOne({
            email: req.body.email
        })

        if (bcryptjs.compareSync(req.body.password, userCandidate.password)) {
            const token = jwt.sign({
                userId: userCandidate._id,
                email: userCandidate.email
            }, config.jwt, {
                expiresIn: 60 * 60 * 24
            })
        }

        res.status(200).json({ token: `Bearer ${token}` })

    } catch (e) {
        handler(res, e)
    }
}