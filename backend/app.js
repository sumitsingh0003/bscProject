const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const router = require('./route/index');
require("dotenv").config({path :"./.env"})

var app = express();

app.use(cors());
app.use(express.static('public'));

app.use('/api', router)
app.get('/', (req, res) => {
    res.send("Running the backend server")
})


const port = process.env.PORT;

app.listen(port, (e) => {
console.log(`The Server is Running. Port is ${port}`);
});