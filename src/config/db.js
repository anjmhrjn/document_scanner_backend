const mongoose = require("mongoose");
const { DB_TO_USE } = require("../constants/__db");

module.exports = () => {
  mongoose.Promise = global.Promise
  return mongoose.connect(DB_TO_USE)
}
