const createError = require("http-errors");
const {
  hashPasswordWithSaltAndPepper,
  compareHashPasswordWithSaltAndPepper,
} = require("../../utils/hash.util");
const {
  generateUniqueCode,
} = require("../../utils/randString.util");
const { signAccessToken } = require("../../utils/jwt.util");
const Users = require("../../models/users/users");

exports.logoutUser = async function (req, res, next) {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async function (req, res, next) {
  try {
    //check if username exists or not
    const checkExists = await Users.findOne({
      username: req.body.username,
    });

    if (!checkExists)
      throw createError.NotFound("Username/password not valid!");

    //check for password
    let validPassword = false;
    validPassword = compareHashPasswordWithSaltAndPepper(
      req.body.password,
      checkExists.salt,
      checkExists.hash
    );
    if (!validPassword)
      throw createError.Unauthorized("Username/password not valid!");

    // prepare data object
    const data = {
      username: checkExists.username,
      firstname: checkExists.firstname,
      lastname: checkExists.lastname,
    };

    // generate access token
    const accessToken = await signAccessToken(data);

    // send response
    return res
      .status(200)
      .json({ success: true, token: accessToken, user: data });
  } catch (error) {
    next(error);
  }
};

exports.singUpUser = async function (req, res, next) {
  try {
    const userexists = await Users.findOne({
      username: req.body.username,
    });
    if (userexists) {
      return res.json({
        success: false,
        message: "Username already exists",
      });
    }
    let salt = generateUniqueCode(30);
    let passwordHash = hashPasswordWithSaltAndPepper(req.body.password, salt);
    await Users.create({
      username: req.body.username,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      hash: passwordHash,
      salt: salt,
    });
    return res.json({
      success: true,
      message: "User created successfully!",
    });
  } catch (error) {
    next(error);
  }
};
