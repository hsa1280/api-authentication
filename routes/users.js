const express = require('express');
const router = require('express-promise-router')();

const UserControllers = require('../controllers/users');
const { validateBody, schemas } = require('../helpers/routerhelpers');

router.route('/signup')
  .post(validateBody(schemas.authSchema), UserControllers.signup);

router.route('/signin')
  .post(UserControllers.signin);

router.route('/secret')
  .get(UserControllers.secret);

module.exports = router;

