import { Typography } from "@mui/material";
import React from "react";
import "./QuestionListItem.css";
// import defaultQuestionImage from "../../../assets/defaultQuestionImage.svg";

function QuestionListItem({ number, type, name, onClick, question }) {
  return (
    <div className={"question-list-item"} onClick={onClick}>
      
      <Typography style={{fontWeight:"600"}}>Сұрақ №{number + 1}</Typography>
      
      <div className={"question-preview"}>
        <h4 className={"question-preview-title"}>{name}</h4>
        <div className={"question-preview-answers"}>
          {question.answerList.map((answer) => (
            <p>
              {answer.name}. {answer.body}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionListItem;
