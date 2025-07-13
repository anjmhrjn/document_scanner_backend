

const router = require("express").Router();
const authenticateToken = require("../../middleware/auth/authenticateToken");
const {
    logoutUser, loginUser, singUpUser
} = require("../../controllers/verification/verification.controller");

router.get("/logout", authenticateToken, logoutUser);

router.post("/login", loginUser);

router.post("/signup", singUpUser);

module.exports = router;
