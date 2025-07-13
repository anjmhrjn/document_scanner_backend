const JWT = require('jsonwebtoken')
const createError = require('http-errors')

//middleware for protected routes
const authenticateToken = (req, res, next) => {
  if (!req.headers['authorization']) return next(createError.Unauthorized())
  const accessToken = req.headers['authorization'].split(' ')[1]
  JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
      return next(createError.Unauthorized(message))
    }
    req.user = payload
    return next()
  })
}
module.exports = authenticateToken
