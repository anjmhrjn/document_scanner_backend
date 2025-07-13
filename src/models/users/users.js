const mongoose = require("mongoose")
const Schema = mongoose.Schema

let User = new Schema(
  {
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      immutable: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      immutable: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    hash: { type: String },
    salt: { type: String },
  },
  {
    timestamps: true,
  }
)

// hide some attributes of user model while sending json response
User.methods.toJSON = function () {
  let user = this.toObject()
  delete user.updatedAt
  delete user.hash
  delete user.salt
  delete user.__v
  return user
}

module.exports = mongoose.model("User", User)
