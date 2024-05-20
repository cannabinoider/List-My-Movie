const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port=6969;

app.get('/', function (req, res) {
 return res.send('Hello');
});

app.listen(port, () => { console.log(`Server is running on port ${port}`); });