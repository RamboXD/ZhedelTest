const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.serverPort || 1500;

const authRouter = require("./routes/auth.js");
const quizRouter = require("./routes/quiz.js");
const gameRouter = require("./routes/game.js");
const userRouter = require("./routes/user.js");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/game", gameRouter);
app.use("/api/auth", authRouter);
app.use("/api/quizes", quizRouter);
app.use("/api/user", userRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.dbUrl);
    app.listen(PORT, () => {
      console.log("Batya v dele on port", PORT);
    });
  } catch (e) {
    console.log("connnection error", e);
  }
};

start();
