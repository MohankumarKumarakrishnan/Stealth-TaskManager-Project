const express = require("express");
const { registerNewUser, loginUser } = require("../controllers/userAuth.controller");
const router = express.Router();

router.post('/user/login',loginUser)

router.post('/user/register',registerNewUser)

module.exports = router;