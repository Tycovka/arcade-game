const express = require("express");
const router = express.Router();
const { getScores, postScore } = require("../controllers/scoreController");

router.get("/", getScores);
router.post("/", postScore);

module.exports = router;