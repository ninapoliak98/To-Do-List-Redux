const { Todo, User, Todolist } = require("../models/models")
const { getTokenInfo } = require("../helpers/getTokenInfo")

class TodoController {
  async create(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const user = await getTokenInfo(token, User)
      const { task, id } = req.body


      if (!task) throw new Error('task is empty')

      await Todo.create({
        task, isComplete: false, todoListId: id, userId: user.id
      })


    } catch (error) {
      next(error)
    }
  }

  async getListTasks(req, res, next) {
    try {
      const { id } = req.body
      const allTasks = await Todo.findAll({ where: { todoListId: id } })
      res.json({ allTasks })
    } catch (error) {
      next(error)
    }
  }

  async getTask(req, res, next) {
    try {
      const { id } = req.params
      const task = await Todo.findOne({ where: { id } })

      if (!task) throw new Error('task does not exist')

      res.json({ task })

    } catch (error) {
      next(error)

    }
  }

  async changeTask(req, res, next) {
    try {
      const { id } = req.params
      const { task } = req.body
      const getTask = await Todo.findOne({ where: { id } })

      if (!getTask) throw new Error('There is no such task')

      if (task === getTask.task) throw new Error('The tasks are the same')

      if (getTask) await getTask.update({ task: task })

      res.json({ getTask })

    } catch (error) {
      next(error)
    }
  }

  async removeTask(req, res, next) {

    try {
      const { id } = req.params
      const { task } = req.body
      const getTask = await Todo.findOne({ where: { id } })

      if (!getTask) throw new Error('There is no such task')

      if (getTask) getTask.destroy()

      res.json("deletion successful")

    } catch (error) {
      new (error)
    }
  }
}

module.exports = new TodoController