const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function getAllQuestions(req, res) {
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
      success: false,
      message: "An error occurred while retrieving questions.",
    });
  }
}

async function getQuestionById(req, res) {
  const { question_id } = req.params;

  try {
    const [questions] = await dbConnection.query(
      "SELECT id, title, description, tag, createdAt FROM questions WHERE id = ?",
      [question_id]
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
}

async function createQuestion(req, res) {
  const { title, description, tag } = req.body;

  // Validate input
  if (!title || !description || !tag) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
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
      id: result.insertId,
      title,
      description,
      tag,
      createdAt: new Date().toISOString(),
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
}

module.exports = { getAllQuestions, getQuestionById, createQuestion };
