const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  creatorFirstName: { type: String, required: true },
  creatorLastName: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  pointsPerQuestion: {
    type: Number,
    min: 1,
  },
  numberOfQuestions: {
    type: Number,
    default: 0,
  },
  isPublic: { type: Boolean, default: false },
  likesCount: { type: [String], default: [] },
  comments: [
    {
      publisherFirstName: {
        type: String,
        required: true,
      },
      publisherLastName: {
        type: String,
        required: true,
      },
      publisherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],
  quizTime: {
    type: Number,
    min: 1,
    max: 240,
  },
  dateCreated: { type: Date, default: new Date() },
  questionList: [
    {
      questionType: {
        type: String,
        enum: ["Quiz"],
        required: true,
      },
      pointType: {
        type: String,
        enum: ["Standard", "Double", "BasedOnTime"],
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      answerList: [
        {
          name: { type: String },
          body: { type: String },
          isCorrect: { type: Boolean },
        },
      ],
      questionIndex: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
