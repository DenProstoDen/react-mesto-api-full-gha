const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');

const app = express();

const router = require('./routes/index');
const { handleCenterError } = require('./middlewares/handleCenterError');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(router);

app.use(errors());

app.use(handleCenterError);

app.listen(PORT);
