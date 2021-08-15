
const express = require('express');
require('dotenv').config()
require('./src/database/mongoose')
const router = require('./src/routes/path');

const app = express();

app.use(express.json())
app.use('/', router)

app.listen(8080, () => console.log('Listening on port: 8080'))