const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

router.use(express.json());

const {
  joinIn,
  detach,
  checkParticipation,
} = require("../controller/CrewController");

router.post("/:id", joinIn);
router.delete("/:id", detach);
router.get("/:id", checkParticipation);

module.exports = router;
