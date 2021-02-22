const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./api.js');
const postController = require('./controllers/postController.js')

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('Server started on port : 3000'));

app.use('/posts', postController)

