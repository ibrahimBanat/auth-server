'use strict';

const User = require('../models/users-model');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('authorization failed due not provided header');
    return;
  }
  try {
    const token = req.headers.authorization.split(' ').pop();
    const user = await User.authenticateBearer(token);
    req.user = user;
    next();
  } catch (error) {
    next('invalid token');
  }
};
