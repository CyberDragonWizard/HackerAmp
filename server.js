const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
require("dotenv").config({ path: "./config.env"});

const api = require('./server/routes/api')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/dist/hackeramp')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/hackeramp/index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API Running')
    })
}

const port = process.env.PORT || 3000;
app.listen(port);





