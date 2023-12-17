const { Todo, User, Todolist } = require("../models/models")
const { getTokenInfo } = require("../helpers/getTokenInfo")

class TodoController {
  async create(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const user = await getTokenInfo(token, User)
      const { task, listId } = req.body


      if (!task) throw new Error('task is empty')

      await Todo.create({
        task, isComplete: false, todoListId: listId, userId: user.id
      })

      res.json('Got all tasks')
    } catch (error) {
      next(error)
    }
  }

  async getListTasks(req, res, next) {
    try {
      const { id } = req.params
      const allTasks = await Todo.findAll({ where: { todoListId: id } })
      res.json(allTasks)
    } catch (error) {
      next(error)
    }
  }

  async getTask(req, res, next) {
    try {
      const { id } = req.params
      const task = await Todo.findOne({ where: { id } })

      if (!task) throw new Error('task does not exist')

      res.json(task)

    } catch (error) {
      next(error)

    }
  }

  async changeTask(req, res, next) {
    try {
      const { id } = req.params
      const { isComplete } = req.body
      const getTask = await Todo.findOne({ where: { id } })

      if (!getTask) throw new Error('There is no such task')


      if (getTask) await getTask.update({ isComplete: isComplete })

      console.log(isComplete)

      res.json(getTask)

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