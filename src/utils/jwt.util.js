const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {
  signAccessToken: (data) => {
    return new Promise((resolve, reject) => {
      const username = data.username
      const secret = process.env.JWT_SECRET
      // expiresIn: '2 days'
      const options = {
        expiresIn: '7 days',
        issuer: 'authrepo.com', // issued by,
        audience: username, // issued to the supplied user with username
      }
      JWT.sign(data, secret, options, (err, token) => {
        if (err) reject(createError.InternalServerError())
        resolve(token)
      })
    })
  },
}
