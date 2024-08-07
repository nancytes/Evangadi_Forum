const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleWare/authMiddleWare.js");
const {
  getAnswersForQuestion,
  submitAnswer,
} = require("../controller/answerController.js");

// Route to get answers for a specific question
router.get("/answer/:question_id", authMiddleWare, getAnswersForQuestion);

// Route to submit an answer for a specific question
router.post("/answer", authMiddleWare, submitAnswer);

module.exports = router;
