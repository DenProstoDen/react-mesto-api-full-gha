require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGO_URL } = require('./utils/config');

const app = express();
app.use(cors());

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
