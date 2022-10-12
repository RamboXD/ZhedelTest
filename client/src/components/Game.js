import React, { useEffect, useState } from "react";
import { Container, Col, Image, Row, Button, Card } from "react-bootstrap";
import {
  CREATE_ROUTE,
  MAIN_ROUTE,
  TESTILEU_ROUTE,
  TEST_ROUTE,
} from "../utils/consts.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { commentQuiz, getQuiz } from "../api/quizAPI.js";
import { Input, InputLabel, FormControl } from "@mui/material";
import { getGame } from "../api/gameAPI.js";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { fontSize } from "@mui/system";

const Game = ({ previewTestId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const id = previewTestId;
  const navigate = useNavigate();
  const [svoi, setSvoi] = useState(true);
  const [quizData, setQuizData] = useState();
  useEffect(() => {
    async function check() {
      const data = await getGame(id);
      console.log(data);
      // console.log(data);
      setQuizData(data);
    }
    check();
  }, [id]);
  console.log(quizData);
  // console.log(user.id);

  return (
    <Container>
      {quizData && (
        <>
          <Row className="d-flex">
            {quizData.playerResultList.map((player) => (
              <>
                {/* <div>{player.name}</div>
                <div>
                  {test.answerList.map((answer) => (
                    <>
                      <div>
                        {answer.name}. {answer.body}
                      </div>
                    </>
                  ))}
                </div> */}
                <Accordion>
                  <AccordionSummary
                    aria-controls="panel1ax-content"
                    id="panel1a-header"
                    style={{display:"flex", alignItems:"center"}}
                  >
                    <Typography style={{fontSize:"18px"}} ml={1}>
                      Нәтиже: {player.score}/{player.maxScore}
                    </Typography>
                    <Typography style={{fontSize:"18px", display:"flex", alignItems:"center"}}  ml={1}>Аты-жөні: {player.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {player.answeredListData.map((answer, ind) => (
                        <>
                          <p style={{fontWeight:"600"}}>
                            {ind + 1}. Сұрақ: {answer.question}
                          </p>
                          <>
                            {answer.selected === answer.answer ? (
                              <>
                                <p style={{backgroundColor:"#5CEB7A"}}>Таңдалды: {answer.selected}</p>
                              </>
                            ) : (
                              <>
                                <p style={{backgroundColor:"red"}}>Таңдалды: {answer.selected}</p>
                              </>
                              )}
                          </>

                          <p>Дұрыс жауабы: {answer.answer}</p>
                          <hr />
                        </>
                      ))}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default Game;
