const { Todolist, User, Todo } = require("../models/models")
const { getTokenInfo } = require("../helpers/getTokenInfo")


class ListController {
  async create(req, res, next) {
    try {
      const { name } = req.body
      if (!name) throw new Error('No name in list')

      const token = req.headers.authorization.split(' ')[1]
      const user = await getTokenInfo(token, User)

      const list = await Todolist.findOne({ where: { name, userId: user.id } })
      if (list) throw new Error('list with this name already exists')

      await Todolist.create({ name, userId: user.id })

      res.json(list)

    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const user = await getTokenInfo(token, User)

      const allUserLists = await Todolist.findAll({ where: { userId: user.id } })


      res.json(allUserLists)


    } catch (error) {
      next(error)
    }
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.params
      const token = req.headers.authorization.split(' ')[1]
      const user = await getTokenInfo(token, User)
      const list = await Todolist.findOne({ where: { id, userId: user.id } })
      res.json(list)
    } catch (error) {
      next(error)
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

      if (!name) throw new Error('no name entered')

      if (checkName) throw new Error('this name already exists in user list')

      if (list) await list.update({ name: name })

      res.json('Changed Name Successfully')

    } catch (error) {
      next(error)
    }
  }
  async removeList(req, res, next) {
    try {
      const { id } = req.params
      const token = req.headers.authorization.split(' ')[1]
      const user = await getTokenInfo(token, User)

      Todo.destroy({ where: { todoListId: id } })

      Todolist.destroy({ where: { id: id, userId: user.id } })

      res.json('Deleted Successfully')

    } catch (error) {
      next(error)
    }
  }
}


module.exports = new ListController