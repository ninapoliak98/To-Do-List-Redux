require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 8500
const router = require('./routes/index')
const sequelize = require('./db')
const bodyParser = require('body-parser')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')


const app = express()

app.use(cors({
  origin: 'https://api.render.com/deploy/srv-cnah76md3nmc73dmps20?key=iAjgBc2rb6k',
  methods: ['GET', 'POST', 'DELETE', 'PUT']
}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router)

app.use(errorHandler)

const startServer = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))
  } catch (e) {

  }
}

startServer()