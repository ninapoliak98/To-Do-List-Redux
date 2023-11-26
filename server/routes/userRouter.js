const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const middleware = require("../middleware/authMiddleware")

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/auth', middleware, userController.check)


module.exports = router