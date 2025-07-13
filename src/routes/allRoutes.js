const verificationRouter = require("./verification/verification")
module.exports = (app) => {
  app.use("/", verificationRouter)
}