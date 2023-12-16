const Router = require('express')
const router = new Router()
const todoController = require('../controllers/todoController')

router.post('/', todoController.create)
router.get('/:id', todoController.getListTasks)
router.get('/:id', todoController.getTask)
router.put('/:id', todoController.changeTask)
router.delete('/:id', todoController.removeTask)


module.exports = router
