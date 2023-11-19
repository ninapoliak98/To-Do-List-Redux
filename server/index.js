require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 8500
const router = require('./routes/index')
const sequelize = require('./db')


const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)



const startServer = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))
  } catch (e) {

  }
}

startServer()