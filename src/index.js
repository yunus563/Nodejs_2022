require('dotenv').config()
const express = require('express');
const app = express();
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const bodyParse = require('body-parser')
const ErrorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
// Router imports
const indexRouter = require('./router/index')
// Models
const models = require('./models/models')

// parse application/x-www-form-urlencoded false
app.use(bodyParse.urlencoded({ extended: false }))
// Use Cors
app.use(cors())
// Use body-parser
app.use(bodyParse.json())
// Static
app.use(express.static(path.resolve(__dirname, 'static')))
// Use fileUpload
app.use(fileUpload())


// Routing use
app.use('/api', indexRouter)
// Middleware
app.use(ErrorHandlingMiddleware)



// Server Starting
const PORT = process.env.PORT || 8080;
const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  }
  catch (e) {
    console.log("SERVER RUNNING ERROR", e);
  }
}

start()