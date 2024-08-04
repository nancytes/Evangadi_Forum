const express = require("express");
const router = express.Router();
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const authMiddleWare = require("../middleWare/authMiddleWare.js");
// Route to get all questions
router.get("/question", authMiddleWare, async (req, res) => {
  try {
    const [questions] = await dbConnection.query(
      "SELECT id, title, description AS body, tag AS tags, createdAt FROM questions"
    );

    if (questions.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "No questions found.",
      });
    }

    return res.status(StatusCodes.OK).json(questions);
  } catch (error) {
    console.error("Error retrieving questions:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
     
      message: "An error occurred while retrieving questions.",
    });
  }
});

// Route to get a specific question (Get Single Question)
router.get("/question/:question_id", authMiddleWare, async (req, res) => {
  const { questionId } = req.params;

  try {
    const [questions] = await dbConnection.query(
      "SELECT id, title, description, tag,  createdAt FROM questions WHERE id = ?",
      [questionId]
    );

    if (questions.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Question not found.",
      });
    }

    return res.status(StatusCodes.OK).json(questions[0]);
  } catch (error) {
    console.error("Error retrieving question:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred while retrieving the question.",
    });
  }
});
// Route to create a new question
router.post("/question", authMiddleWare, async (req, res) => {
  const { title, description, tag } = req.body;

  // Validate input
  if (!title || !description || !tag) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Invalid input. Please provide all required fields.",
    });
  }

  try {
    // Save new question to the database
    const [result] = await dbConnection.query(
      "INSERT INTO questions (title, description, tag) VALUES (?, ?, ?)",
      [title, description, tag]
    );

    const newQuestion = {
      id: result.insertId, // ID of the newly created question
      title,
      description,
      tag,
      createdAt: new Date().toISOString(), // Current timestamp
    };

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Question created successfully.",
      question: newQuestion,
    });
  } catch (error) {
    console.error("Error creating question:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred while creating the question.",
    });
  }
});

module.exports = router;


