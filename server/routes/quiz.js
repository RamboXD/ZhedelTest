const express = require("express");
const router = express.Router();

const {
  createQuiz,
  getQuizes,
  getPublicQuizes,
  getQuizesBySearch,
  getTeacherQuizes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  addQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  likeQuiz,
  commentQuiz
} = require("../controllers/quiz.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.post("/", authMiddleware, createQuiz);
router.get("/", authMiddleware, getQuizes);

router.get("/public", authMiddleware, getPublicQuizes)
router.get("/search", authMiddleware, getQuizesBySearch)

router.get("/teacher/:teacherId", authMiddleware, getTeacherQuizes)

router.get("/:id", getQuiz);
router.delete("/:id", authMiddleware, deleteQuiz);
router.patch("/:id", authMiddleware, updateQuiz);

router.patch("/:id/likeQuiz", authMiddleware, likeQuiz)
router.post("/:id/commentQuiz", authMiddleware, commentQuiz)

router.post("/:quizId/questions", authMiddleware, addQuestion);
router.get("/:quizId/questions", authMiddleware, getQuestions);


router.get("/:quizId/questions/:questionId", authMiddleware, getQuestion);
router.patch("/:quizId/questions/:questionId", authMiddleware, updateQuestion);
router.delete("/:quizId/questions/:questionId", authMiddleware, deleteQuestion);

// router
//     .route('/:quizId/questions/:questionId')
//     .patch(updateQuestion)
//     .delete(deleteQuestion)

module.exports = router;
