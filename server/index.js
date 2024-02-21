require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 8500
const router = require('./routes/index')
const sequelize = require('./db')
const bodyParser = require('body-parser')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')


const app = express()

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://api.render.com/deploy/srv-cnah9p6n7f5s73elk900?key=zA7nr3IcvVc"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.use(cors({
  origin: 'https://api.render.com/deploy/srv-cnah9p6n7f5s73elk900?key=zA7nr3IcvVc',
  methods: ['GET', 'POST', 'DELETE', 'PUT']
}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router)

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