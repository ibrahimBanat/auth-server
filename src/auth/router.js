'use strict';

const express = require('express');
let router = express.Router();
const basic = require('./middleware/basic');
const bearerAuth = require('../auth/middleware/bearer');
const bcrypt = require('bcrypt');
const User = require('./models/users-model');

//sign-in

router.post('/signin', basic, signinhandler);

async function signinhandler(req, res) {
  res.status(200).json({
    user: req.user,
    token: req.user.token,
  });
}

//sign-up
router.post('/signup', signUpHandler);

async function signUpHandler(req, res, next) {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({
      user: savedUser,
      token: savedUser.token,
    });
  } catch (error) {
    next(error.message);
  }
}

// /user route
router.get('/user', bearerAuth, (req, res) => {
  res.json({ user: req.user });
});

// test 500
router.get('/bad', badErrorHandler);

function badErrorHandler(req, res, next) {
  next('somethign went wrong');
}
module.exports = router;
