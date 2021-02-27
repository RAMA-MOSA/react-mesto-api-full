const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorFound = require('../errors/error-found');
const ErrorRequest = require('../errors/error-request');
const ErrorAuth = require('../errors/error-auth');
const ErrorConflict = require('../errors/error-conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

const updateCurrentUser = (req, res, next) => {
  const id = req.user._id;
  const newName = req.body.name;
  const newAbout = req.body.about;

  User.findOneAndUpdate(
    { _id: id },
    {
      name: newName,
      about: newAbout,
    },
    {
      runValidators: true,
      new: true,
    },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ErrorRequest(err.message);
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const id = req.user._id;
  const newAvatar = req.body.avatar;
  User.findOneAndUpdate(
    { _id: id },
    { avatar: newAvatar },
    {
      runValidators: true,
      new: true,
    },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ErrorRequest(err.message);
      }
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new ErrorFound('Нет пользователя с таким id.');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ErrorRequest(err.message);
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ErrorRequest(err.message);
      }
      if (err.code === 11000) {
        throw new ErrorConflict('Пользователь с таким email уже существует.');
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      throw new ErrorAuth(err.message);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.send(err);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateCurrentUser,
  getCurrentUser,
  login,
};
