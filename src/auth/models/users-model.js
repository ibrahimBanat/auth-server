'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET || 'super-secret-token';

const usersSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
usersSchema.virtual('token').get(function () {
  let tokens = {};
  tokens.refesherToken = jwt.sign({ username: this.username }, SECRET, {
    expiresIn: '12h',
  });
  tokens.acessToken = jwt.sign({ username: this.username }, SECRET, {
    expiresIn: '900s',
  });

  return tokens;
});
usersSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
usersSchema.statics.authnticateBasic = async function (username, password) {
  try {
    const user = await this.findOne({ username });

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return user;
    } else {
      throw new Error('Invalid user!!!');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
usersSchema.statics.authenticateBearer = async function (token) {
  try {
    const payload = jwt.verify(token, SECRET);

    const user = await this.findOne({
      username: payload.username,
    });

    if (user) {
      return user;
    } else {
      throw new Error('invalid username from token');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
// create a mongoose model
const Users = mongoose.model('users', usersSchema);

module.exports = Users;
