const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const userRout = require('./users');
const cardRout = require('./cards');
const { signInValid, signUpValid } = require('../utils/validation');

router.post('/signin', signInValid, login);

router.post('/signup', signUpValid, createUser);

router.use(auth);

router.use('/users', userRout);
router.use('/cards', cardRout);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
