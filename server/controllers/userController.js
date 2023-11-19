const bcrypt = require('bcrypt')
const { User } = require('../models/models')
const { generateJwt } = require('../helpers/generateJwt')

class UserController {
  async signup(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw new Error('Email or Password Missing')

      const checkUser = await User.findOne({ where: { email } })
      if (checkUser) throw new Error('User with this email already exists')

      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({ email, password: hashPassword })

      const token = generateJwt(user.id, user.email)

      return res.json({ token })

    } catch (error) {
      next(error)
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })
      if (!user) throw new Error('User with this email does not exist')

      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) throw new Error('Password is not correct')

      const token = generateJwt(user.id, user.email)
      return res.json({ token })

    } catch (error) {
      next(error)
    }
  }
  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.role)
      return res.json({ token })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController

