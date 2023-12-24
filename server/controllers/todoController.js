const { Todo, User, Todolist } = require("../models/models")
const { getTokenInfo } = require("../helpers/getTokenInfo")
const ApiError = require('../errors/ApiError')

class TodoController {
  async create(req, res, next) {
    try {
      const { task, listId } = req.body
      const token = req.headers.authorization.split(' ')[1]
      const user = await getTokenInfo(token, User)

      if (!task) {
        return next(ApiError.unprocessable('Name input was left blank'))
      }

      await Todo.create({
        task, isComplete: false, todoListId: listId, userId: user.id
      })

      res.status(201).json('Got all tasks')
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getListTasks(req, res, next) {
    try {
      const { id } = req.params
      const allTasks = await Todo.findAll({ where: { todoListId: id } })
      res.status(200).json(allTasks)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getTask(req, res, next) {
    try {
      const { id } = req.params
      const task = await Todo.findOne({ where: { id } })

      res.ststus(200).json(task)

    } catch (error) {
      next(ApiError.badRequest(error.message))

    }
  }

  async changeTask(req, res, next) {
    try {
      const { id } = req.params
      const { isComplete } = req.body
      const getTask = await Todo.findOne({ where: { id } })

      if (getTask) {
        await getTask.update({ isComplete: isComplete })
      }

      res.status(200).json(getTask)

    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async removeTask(req, res, next) {

    try {
      const { id } = req.params
      const getTask = await Todo.findOne({ where: { id } })

      if (getTask) {
        getTask.destroy()
      }

      res.status(200).json("deletion successful")

    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new TodoController