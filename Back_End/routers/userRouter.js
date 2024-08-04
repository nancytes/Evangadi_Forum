const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleWare/authMiddleWare.js");
const {
  register,
  login,
  checkUser,
} = require("../controller/userController.js");

router.post("/register", register);
router.post("/login", login);

router.get("/checkUser", authMiddleWare, checkUser);
module.exports = router;
