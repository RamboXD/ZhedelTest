const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({

  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  }, 
  gameName: {
    type: String,
    required: true
  },
  //   date: {
  //     type: Date,
  //     required: true,
  //     default: Date.now,
  //   },
  playerResultList: [
    {
      name: { type: String },

      score: { type: Number },
      maxScore: { type: Number },
      answeredListData: [
        {
          question: { type: String },
          selected: { type: String },
          answer: { type: String },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Game", gameSchema);
