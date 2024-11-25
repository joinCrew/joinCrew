const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();

router.use(express.json());

const {joinIn, detach}= require("../controller/CrewController");

router.post('/:id', joinIn);
router.delete('/:id', detach);

module.exports = router;