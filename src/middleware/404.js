'use strict';
module.exports = (req, res) => {
  res.status(404).json({
    error: 404,
    route: req.path,
    message: 'looks like behemoth took the file to the upside down',
  });
};
