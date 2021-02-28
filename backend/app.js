const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
// eslint-disable-next-line import/order
const cors = require('cors');
// eslint-disable-next-line import/order
const { errors, celebrate, Joi } = require('celebrate');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');
const pageNotFoundErrorRoutes = require('./routes/pageNotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const allowedCors = [
  'https://m-s.students.nomoredomains.icu',
  'https://api.m-s.students.nomoredomains.icu',
  'http://localhost:3001',
];

app.use(cors({
  origin: allowedCors,
}));

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8).max(30),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required()
        .pattern(new RegExp('^[A-Za-z0-9]{8,30}$')),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string()
        .regex(/^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/),
    }),
  }),
  createUser,
);

app.use(auth);

app.use('/', cardsRoutes);
app.use('/', usersRoutes);
app.use('/*', pageNotFoundErrorRoutes);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'MongoError' && err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с таким email уже существует.' });
  } else if (err.message === 'celebrate request validation failed') {
    res.status(400).send({ message: 'Отправленные данные не прошли валидацию.' });
  } else if (err.name === 'CastError') {
    res.status(400).send({ message: 'Попытка удалить карточку с невалидным id.' });
  } else {
    res.status(statusCode).send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка.'
        : message,
    });
  }
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
