'use strict';

module.exports = (error, req, res, next) => {
  const err = error.message ? error.message : error;
  res.statusMessage = 'server Error :(';
  res.status(500).json({
    err,
  });
};
