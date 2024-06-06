const express = require('express')
const ourRouters = require('./routes/Movierouter')
const bodyParser = require('body-parser');
const mongodb = require("mongoose")
const cors = require("cors");

const app = express()
const port = 8000

app.use(cors());
app.use(bodyParser.json());
app.use('/', ourRouters);

mongodb.connect('mongodb://localhost:27017/Movie')
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on port ${port} : http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log(err);
  }
  )