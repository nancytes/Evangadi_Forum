const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleWare/authMiddleWare.js");
const {
  getAllQuestions,
  getQuestionById,
  createQuestion,
} = require("../controller/question.js");

// Route to get all questions
router.get("/question", authMiddleWare, getAllQuestions);

// Route to get a specific question (Get Single Question)
router.get("/question/:question_id", authMiddleWare, getQuestionById);

// Route to create a new question
router.post("/question", authMiddleWare, createQuestion);

module.exports = router;
