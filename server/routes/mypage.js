const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

router.use(express.json());
const getMypage = require("../controller/MypageController");

router.get("/my-page", getMypage);

module.exports = router;