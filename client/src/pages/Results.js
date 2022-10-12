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
import { jsx, css } from "@emotion/react";

import { CircularProgress, useMediaQuery, useTheme } from "@material-ui/core";

const Results = () => {
  const [resData, setResData] = useState([]);
  useEffect(() => {
    async function check() {
      const data = await getGames();
      console.log(data);
      setResData(data);
      if (resData) {
        setLoading(false);
      }
    }
    check();
  }, []);
  const [previewTestId, setPreviewTestId] = useState(null);
  const [loading, setLoading] = useState(true);
  const styles = {
    root: css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: white;
    `,
    circularProgress: css`
      @keyframes changeColor {
        12.5% {
          color: #ff0000;
        }
        25% {
          color: #ffa500;
        }
        37.5% {
          color: #ffff00;
        }
        50% {
          color: #7fff00;
        }
        62.5% {
          color: #00ffff;
        }
        75% {
          color: #0000ff;
        }
        87.5% {
          color: #9932cc;
        }
        100% {
          color: #ff1493;
        }
      }
      animation: MuiCircularProgress-keyframes-circular-rotate 1.4s linear
          infinite,
        changeColor 2s linear infinite;
    `,
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  if (loading) {
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
          alignItems: "center",
        }}
      >
        <div css={styles.root}>
          <CircularProgress
            thickness={5}
            size={isMobile ? 75 : 100}
            disableShrink
            css={styles.circularProgress}
          />
        </div>
      </div>
    );
  }
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
