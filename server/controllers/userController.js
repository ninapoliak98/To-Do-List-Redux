const bcrypt = require('bcrypt')
const { User } = require('../models/models')
const { generateJwt } = require('../helpers/generateJwt')
const ApiError = require('../errors/ApiError')

class UserController {
  async signup(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email) {
        return next(ApiError.unprocessable('Email input was left blank'))
      }

      if (!password) {
        return next(ApiError.unprocessable('Password input was left blank'))
      }

      const checkUser = await User.findOne({ where: { email } })

      if (checkUser) {
        return next(ApiError.forbiden('User with this email already exists'))
      }

      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({ email, password: hashPassword })

      res.status(201).json('You have signed up successfully')

    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })

      if (!user) {
        return next(ApiError.notFound('user with this email does not exist'))
      }

      let comparePassword = bcrypt.compareSync(password, user.password)

      if (!comparePassword) {
        return next(ApiError.unauthorized('password is incorrect'))
      }

      const token = generateJwt(user.id, user.email)

      res.status(200).json({ success: true, token })

    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email)
      res.status(200).json({ token })
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new UserController

