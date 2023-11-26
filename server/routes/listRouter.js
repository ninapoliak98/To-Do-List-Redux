const Router = require('express')
const router = new Router()
const listController = require('../controllers/listController')



router.post('/:id', listController.create)
router.get('/', listController.getAll)
router.put('/:id', listController.changeName)
router.delete('/:id', listController.removeList)


module.exports = router