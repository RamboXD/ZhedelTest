import React, { useState } from "react";
import { Button, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  CREATE_ROUTE,
  PUBLIC_TEST_ROUTE,
  TESTILEU_ROUTE,
  TEST_ROUTE,
} from "../utils/consts.js";
import { createGame } from "../api/gameAPI.js";
import "./myQuiz.css";
import { deleteQuiz, likeQuiz } from "../api/quizAPI.js";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { green } from "@mui/material/colors";
import { Link, Typography } from "@mui/material";

function PublicQuiz({ quiz, setPreviewTestId }) {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [clicked, setClicked] = useState(false);
  const [link, setLink] = useState();
  const [likes, setLikes] = useState(quiz.likesCount.length);
  console.log(`${user.id}`);
  const likeTest = async () => {
    try {
      console.log(quiz.likesCount.indexOf(`${user.id}`));
      if (quiz.likesCount.indexOf(`${user.id}`) > -1) {
        setLikes(likes - 1);
        quiz.likesCount.splice(quiz.likesCount.indexOf(`${user.id}`), 1);
      } else {
        quiz.likesCount.push(`${user.id}`);
        setLikes(likes + 1);
      }
      console.log(quiz.likesCount);
      await likeQuiz(quiz._id);
      // console.log(data);
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  // console.log(quiz);
  return (
    <Container
      style={{
        margin: "0",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Link
        className="quiz-card"
        onClick={() => setPreviewTestId(quiz._id)}
        sx={{
          backgroundColor: "#eef2f2",
          borderRadius: "15px",
          "&:hover": {
            cursor: "pointer",
          },
          marginTop: "20px",
          width: "82.5%",
          height: "auto",
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          boxShadow: 0,
          justifyContent: "center",
        }}
      >
        <div style={{ marginLeft: "20px", marginRight: "20px" }}>
          <Typography
            style={{ fontSize: "20px", fontWeight: "35", marginBottom: "5px" }}
          >
            Атауы: {quiz.name}
          </Typography>
          <Typography style={{ fontSize: "15px", marginBottom: "5px" }}>
            Құрастырған: {quiz.creatorLastName} {quiz.creatorFirstName}
          </Typography>
          <Typography style={{ fontSize: "15px", marginBottom: "10px" }}>
            Сипаттамасы: {quiz.description}
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Link onClick={likeTest} style={{ textDecoration: "none" }}>
              <ThumbUpIcon
                sx={{
                  color: "white",
                  backgroundColor: "#3FB6AC",
                  borderRadius: "25%",
                  "&:hover": {
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  },
                  marginRight: "10px",
                }}
                fontSize=""
              />
            </Link>
            <>{likes}</>
          </div>
        </div>
      </Link>
    </Container>
  );
}

export default PublicQuiz;
