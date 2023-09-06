const {UnauthorizedError} = require('../errors')


function ensureAdmin(req, res, next) {

    if (req.user.role === 'ADMIN') {
      next();
    } else {
      throw new UnauthorizedError('Not authorized')
    }
  }

  module.exports = ensureAdmin




