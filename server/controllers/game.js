const mongoose = require("mongoose");
const Game = require("../models/Game.js");

const createGame = async (req, res) => {
  let {quizId, gameName} = req.body;
  // const id = quizId.gameId;
  // quizId = id;
  // console.log(quizId);
  const game = new Game({
    hostId: req.user.id,
    quizId,
    gameName,
    playerResultList: [],
    // date: new Date().toISOString(),
  });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getGames = async (req, res) => {
  let teacherId = req.user.id
  try {
    const games = await Game.find({hostId: teacherId});
    res.status(200).send(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGame = async (req, res) => {
  let game;
  try {
    game = await Game.findById(req.params.id);
    if (game == null) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteGame = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No game with id: ${id}`);
  }

  try {
    await Game.findByIdAndRemove(id);
    res.json({ message: "Game deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addResult = async (req, res) => {
  const gameId = req.params;
  const id = gameId.id;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No game with id: ${id}`);
  }
  const { name, score, maxScore, answeredListData } = req.body;
  console.log(answeredListData);
  let game;
  try {
    game = await Game.findById(id);
    game.playerResultList.push({ name, score, maxScore, answeredListData });
    const updatedGame = await game.save();
    res.send(updatedGame);
  } catch (error) { 
    res.status(400).json({ message: error.message });
  }
};
const getResult = async (req, res) => {
  const gameId = req.params;
  const id = gameId.id;
  // const {name, score, maxScore} = req.body
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No game with id: ${id}`);
  }
  let game;
  try {
    game = await Game.findById(id);
    const gameResult = game.playerResultList;
    res.send(gameResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  createGame,
  getGames,
  getGame,
  deleteGame,
  getResult,
  addResult,
};
