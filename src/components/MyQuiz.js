import React, { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CREATE_ROUTE, TESTILEU_ROUTE, TEST_ROUTE } from "../utils/consts.js";
import { createGame } from "../api/gameAPI.js";
import "./myQuiz.css";
import { deleteQuiz } from "../api/quizAPI.js";
import {
  Button,
  FormControl,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "./Modal.js";

function MyQuiz({ quiz, setPreviewTestId }) {
  const [copied, setCopied] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [link, setLink] = useState();
  const [name, setName] = useState("");
  const createGamePage = async () => {
    if (clicked == false) {
      try {
        console.log(quiz._id);
        const data = await createGame(quiz._id, name);
        setClicked(true);
        setLink("localhost:3000" + TESTILEU_ROUTE + `/${data._id}`);
        // navigate(TESTILEU_ROUTE + `/${data._id}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      setClicked(false);
    }
  };
  const copyIt = (event) => {
    setCopied(true);
    event.preventDefault();
    navigator.clipboard.writeText(link);
  };
  console.log(clicked);
  console.log(link);
  const deleteTest = async () => {
    try {
      console.log(quiz._id);
      const data = await deleteQuiz(quiz._id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState(false);
  console.log(name);
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
          <Button
            style={{ color: "#40B7AD" }}
            onClick={() => {
              setActiveGame(true);
            }}
          >
            Тестілеу
          </Button>
          <Button style={{ color: "#40B7AD" }} onClick={deleteTest}>
            Жою
          </Button>
        </div>
      </Link>
      <Modal active={activeGame} setActive={setActiveGame}>
        {clicked == true ? (
          <>
            <FormControl
              style={{
                width: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link
                href={link}
                style={{
                  width: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {" "}
                {link}
              </Link>
              <Button
                variant="outlined"
                style={{ color: "#40B7AD" }}
                onClick={copyIt}
              >
                {copied === false ? (
                  <>Тесттің ссылкасын көшіру</>
                ) : (
                  <>Көшірілді</>
                )}
              </Button>
            </FormControl>
          </>
        ) : (
          <FormControl>
            <TextField
              id="outlined-multiline-flexible"
              label="Кім/Кімдер Тестіленеді?"
              multiline
              maxRows={4}
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <Button
              className="mt-4"
              style={{ backgroundColor: "#40B7AD", color: "white" }}
              onClick={createGamePage}
            >
              Тестілеу
            </Button>
          </FormControl>
        )}
      </Modal>
    </Container>
  );
}

export default MyQuiz;
