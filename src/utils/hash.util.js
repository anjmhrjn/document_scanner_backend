const bcrypt = require('bcryptjs')
function hashPasswordWithSaltAndPepper(supplied, salt) {
  let saltedPassword = supplied + salt + process.env.PEPPER
  return bcrypt.hashSync(saltedPassword, bcrypt.genSaltSync(10))
}

function compareHashPasswordWithSaltAndPepper(supplied, salt, hashedPassword) {
  let saltedPassword = supplied + salt + process.env.PEPPER
  return bcrypt.compareSync(saltedPassword, hashedPassword)
}

module.exports = {
  hashPasswordWithSaltAndPepper,
  compareHashPasswordWithSaltAndPepper
}
