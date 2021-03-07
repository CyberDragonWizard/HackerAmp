const express = require('express');
const path = require('path');
const app = express();
require("dotenv").config({ path: "./config.env"});

const api = require('./server/routes/api')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));





