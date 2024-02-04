// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const { PORT, MONGO_URL } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// eslint-disable-next-line import/no-extraneous-dependencies

const app = express();

const router = require('./routes/index');
const { handleCenterError } = require('./middlewares/handleCenterError');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(handleCenterError);

app.listen(PORT);
