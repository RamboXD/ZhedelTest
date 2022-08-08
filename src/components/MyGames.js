import React, { useEffect, useState } from "react";
import { Button, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CREATE_ROUTE, TESTILEU_ROUTE, TEST_ROUTE } from "../utils/consts.js";
import { createGame, deleteGames } from "../api/gameAPI.js";
import "./myQuiz.css";
import { deleteQuiz, getQuiz } from "../api/quizAPI.js";
import { Link, Typography } from "@mui/material";

function MyGames({ game, setPreviewTestId }) {
  const [quizes, setQuizes] = useState({});
  useEffect(() => {
    async function check() {
      const data = await getQuiz(game.quizId);
      setQuizes(data);
      //   console.log(quizes);
    }
    check();
  }, []);
  console.log(quizes);
  //   console.log();
  const navigate = useNavigate();
  const deleteGame = async () => {
    try {
      console.log(game._id);
      const data = await deleteGames(game._id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Link
        className="quiz-card"
        onClick={() => setPreviewTestId(game._id)}
        sx={{
          backgroundColor: "#eef2f2",
          borderRadius: "15px",
          "&:hover": {
            cursor: "pointer",
          },
          marginTop: "20px",
          marginLeft: "25px",
          width: "82.5%",
          height: "auto",
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          boxShadow: 0,
        }}
      >
        <div
          style={{
            marginLeft: "20px",
            marginRight: "20px",
            marginBottom: "5px",
          }}
        >
          <Typography style={{ fontSize: "20px", fontWeight: "35" }}>
            Тестіленген: {game.gameName}
          </Typography>
          <Typography style={{ fontSize: "15px", marginBottom: "5px" }}>
            Тест атауы: {quizes && <>{quizes.name}</>}
          </Typography>
        </div>
        <Button onClick={deleteGame} style={{ backgroundColor: "#40B7AD" }}>
          Нәтижені  жою
        </Button>
      </Link>
      {/* <Button onClick={""}>Тестілеу</Button> */}
    </Container>
  );
}

export default MyGames;
