import { TextField, Typography } from "@mui/material";
import React from "react";
import "./AnswerInput.css";
// import answerCheck from "../../../assets/answerCheck.svg"

function AnswerInput({ value, onChange, onClick, isAnswerCorrect, name }) {
  return (
    <>
      <Typography style={{fontSize:"20px", fontWeight:"600", marginRight:"5px"}}>{name}</Typography>
      <TextField type="text" multiline label="Нұсқаны осында жаз" value={value} onChange={onChange} name={name} />
      <div onClick={onClick} className={"answer-check"} style={{backgroundColor:isAnswerCorrect ? "green" : "red"}}>
        <img
          style={{ visibility: isAnswerCorrect ? "visible" : "hidden" }}
          //   src={answerCheck}
          alt=""
        />
      </div>
    </>
  );
}

export default AnswerInput;
