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
    res.status(403).send('Invalid token');
  }
};
/**
 *
 *
 * mongodb://2069701q:<password>@cluster0-shard-00-00.lfys3.mongodb.net:27017,cluster0-shard-00-01.lfys3.mongodb.net:27017,cluster0-shard-00-02.lfys3.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-10ssrr-shard-0&authSource=admin&retryWrites=true&w=majority
 *
 *
 *
 *
 */
