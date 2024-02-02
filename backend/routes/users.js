const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUsersId, updateUserProfile, updateAvatar, getUserMe,
} = require('../controllers/users');
const urlReg = require('../utils/constants');

router.get('/users', getUsers);
router.get('/users/me', getUserMe);

router.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  getUsersId,
);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlReg),
  }),
}), updateAvatar);

module.exports = router;
