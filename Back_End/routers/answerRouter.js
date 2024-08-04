const express = require("express");
const router = express.Router();
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const authMiddleWare = require("../middleWare/authMiddleWare.js");
// Route for Get Answers for a Question
router.get("/answer/:question_id", authMiddleWare, async (req, res) => {
  const { question_id } = req.params;

  try {
    const [answers] = await dbConnection.query(
      "SELECT id, question_id, userId, answer, createdAt FROM answers WHERE question_id = ?",
      [question_id]
    );

    if (answers.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
       
        message: "No answers found for this question.",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      answers,
    });
  } catch (error) {
    console.error("Error retrieving answers:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
     
      message: "An error occurred while retrieving answers.",
    });
  }
});
// Route to submit an answer for a specific question
router.post("/answer", authMiddleWare, async (req, res) => {
  const { questionId } = req.params;
  const { answer } = req.body;

  if (!answer) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid input. Please provide a valid answer.",
    });
  }

  try {
    const { userId } = req.user; 

    // Save answer to the database
    await dbConnection.query(
      "INSERT INTO answers (userId, questionId, answer) VALUES (?, ?, ?)",
      [userId, questionId, answer]
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Answer submitted successfully.",
      answer: {
        userId,
        questionId,
        answer,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error submitting answer:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred while submitting the answer.",
    });
  }
});

module.exports = router;
