const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
const listRouter = require('./listRouter')

router.use('/user', userRouter)
router.use('/todo', todoRouter)
router.use('/list', listRouter)

module.exports = router