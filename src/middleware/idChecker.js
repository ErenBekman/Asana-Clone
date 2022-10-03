const httpStatus = require('http-status');
const ApiError = require('../errors/ApiError');

const idChecker = (field) => (req, res, next) => {
   if (req.params[field || 'id'].match(/[^a-zA-Z0-9]{24}$/)) {
      !next(new ApiError('id is not valid!', httpStatus.BAD_REQUEST));
      return;
   }
   next();
};

module.exports = idChecker;
