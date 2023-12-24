const { Todolist, User, Todo } = require("../models/models")
const { getTokenInfo } = require("../helpers/getTokenInfo")
const ApiError = require('../errors/ApiError')


class ListController {
  async create(req, res, next) {
    try {
      const { name } = req.body
      const token = req.headers.authorization.split(' ')[1]
      const user = await getTokenInfo(token, User)
      const list = await Todolist.findOne({ where: { name, userId: user.id } })

      if (!name) {
        return next(ApiError.unprocessable('Name input was left blank'))
      }
      if (list) {
        return next(ApiError.forbiden('The list name is already used'))
      }

      await Todolist.create({ name, userId: user.id })

      res.status(201).json(list)

    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const user = await getTokenInfo(token, User)

      const allUserLists = await Todolist.findAll({ where: { userId: user.id } })


      res.status(200).json(allUserLists)


    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.params
      const token = req.headers.authorization.split(' ')[1]
      const user = await getTokenInfo(token, User)
      const list = await Todolist.findOne({ where: { id, userId: user.id } })
      res.status(200).json(list)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async changeName(req, res, next) {
    try {
      const { name } = req.body
      const { id } = req.params
      const token = req.headers.authorization.split(' ')[1]
      const user = await getTokenInfo(token, User)
      const list = await Todolist.findOne({ where: { id: id, userId: user.id } })
      const checkName = await Todolist.findOne({ where: { name: name, userId: user.id } })

      if (!name) {
        return next(ApiError.unprocessable('Name input was left blank'))
      }

      if (checkName) {
        return next(ApiError.forbiden('The name is already used'))
      }

      if (list) {
        await list.update({ name: name })
      }

      res.status(200).json('name changed succesfully')

    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  async removeList(req, res, next) {
    try {
      const { id } = req.params
      const token = req.headers.authorization.split(' ')[1]
      const user = await getTokenInfo(token, User)

      Todo.destroy({ where: { todoListId: id } })

      Todolist.destroy({ where: { id: id, userId: user.id } })

      res.status(200).json('Deleted Successfully')

    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}


module.exports = new ListController