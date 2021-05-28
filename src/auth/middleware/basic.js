'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const Users = require('../models/users-model');
/**
 *
 * @param {Object} req Http request object and it's properties
 * @param {Object} res Http request object and it's properties
 * @param {*} next
 */
module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('authorization is failed, problem casued by non provided headers');
  }
  try {
    console.log(req.headers);
    let encoded = req.headers.authorization;
    let userString = encoded.split(' ').pop();
    let decoded = base64.decode(userString); // username:pass
    const [username, password] = decoded.split(':');

    let user = await Users.authnticateBasic(username, password);
    console.log('user:', user);
    req.user = user;

    next();
  } catch (error) {
    res.status(403).send(error);
  }
};
