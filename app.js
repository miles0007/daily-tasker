
const express = require('express');

require('./database/mongoose')
const router = require('./routes/routes');

const app = express();

app.use(express.json())
app.use('/', router)

app.listen(8080, () => console.log('Listening on port: 8080'))