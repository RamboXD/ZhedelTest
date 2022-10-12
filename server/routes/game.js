const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware");

const {
  createGame,
  getGames,
  getGame,
  deleteGame,
  addResult,
  getResult
} = require("../controllers/game");

router.post("/", authMiddleware, createGame);
router.get("/", authMiddleware, getGames);
router.get("/:id", getGame);
router.delete("/:id", authMiddleware, deleteGame);
router.post("/results/:id", addResult);
router.get("/results/:id", authMiddleware, getResult);


module.exports = router