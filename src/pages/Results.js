import React, { useEffect, useState } from "react";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getGames } from "../api/gameAPI.js";
import { createQuiz, getTeacherQuizes } from "../api/quizAPI.js";
import Game from "../components/Game.js";
import MyGames from "../components/MyGames.js";
import MyQuiz from "../components/MyQuiz.js";
import { CREATE_ROUTE } from "../utils/consts.js";
import styles from "./Admin.css";

const Results = () => {
  const [resData, setResData] = useState([]);
  useEffect(() => {
    async function check() {
      const data = await getGames();
      console.log(data);
      setResData(data);
    }
    check();
  }, []);
  const [previewTestId, setPreviewTestId] = useState(null);

  return (
    <div
      className="mt-2"
      style={{
        marginLeft: "10vw",
        width: "80vw",
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Row className="mt-3" style={{ height: "100%", flexGrow: "1" }}>
        <Col
          md={6}
          className="eshak"
          xs={12}
          style={{ borderRight: "solid 2px lightgrey" }}
        >
          <h2 style={{ paddingRight: "80px", fontWeight: "bold" }}>
            Тестіленгендер
          </h2>
          {resData.map((game) => (
            <MyGames
              key={game._id}
              game={game}
              setPreviewTestId={setPreviewTestId}
            />
          ))}
        </Col>
        <Col md={6} xs={12}>
          <h2 style={{ paddingRight: "80px", fontWeight: "bold",
                marginBottom: "25px" }}>
            Нәтижелер
          </h2>
          {previewTestId ? (
            <Game previewTestId={previewTestId} />
          ) : (
            <Container
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Тест таңдалынбады
            </Container>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Results;
