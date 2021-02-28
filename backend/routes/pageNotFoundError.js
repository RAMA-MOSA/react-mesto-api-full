const router = require('express').Router();
const ErrorFound = require('../errors/error-found');

router.all('/', (req, res, next) => {
  const err = new ErrorFound('Запрашиваемый ресурс не найден.');
  next(err);
});

module.exports = router;
