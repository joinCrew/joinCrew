const express = require("express"); // express 모듈
const router = express.Router();

router.use(express.json());

const { login, join, logout } = require("../controller/UserController");

router.post("/join", join);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
