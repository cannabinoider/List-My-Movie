const express = require('express')
const ourRouters = require('./router')
const mongodb = require("mongoose")

const app = express()
const port = 6969

app.use('/', ourRouters);

mongodb.connect('mongodb://localhost:27017/Movie')
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on port ${port} : http://localhost:${port}`)
    })
  })
  .catch((err)=>{
    console.log(err);
  }
  )