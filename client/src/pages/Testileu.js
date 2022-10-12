import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { createQuiz, getQuiz, getTeacherQuizes } from "../api/quizAPI.js";
import { addResult, getGame } from "../api/gameAPI.js";
import MyQuiz from "../components/MyQuiz.js";
import { CREATE_ROUTE } from "../utils/consts.js";
import styles from "./Admin.css";
import "./Testileu.css";
import {
  TextField,
  Alert,
  AlertTitle,
  Stack,
  Button,
  FormControl,
  Typography,
  Pagination,
} from "@mui/material";

const Testileu = () => {
  const [currentPageData, setCurrentPageData] = useState(new Array(1).fill());
  const { id } = useParams();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [student, setStudent] = useState("");
  const [showScore, setShowScore] = useState(false);
  const [inputName, setInputName] = useState("");
  const [answeredListData, setAnsweredListData] = useState([]);
  console.log("answeredListData:", answeredListData);
  const [quizData, setQuizData] = useState({
    name: "",
    // // creatorName: `${user?.result.firstName} ${user?.result.lastName}`,
    // // backgroundImage: "",
    // // description: "",
    pointsPerQuestion: 1,
    numberOfQuestions: 0,
    // // isPublic: true,
    // // tags: [],
    questionList: [],
  });
  useEffect(() => {
    async function check() {
      const data = await getGame(id);
      const quizData = await getQuiz(data.quizId);
      console.log(quizData);
      setQuizData(quizData);
    }
    check();
  }, [id]);

  const handleNextQuestion = (isCorrect, body) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    let trueOne;
    for (let i = 0; i < 4; i++) {
      if (
        quizData.questionList[questionNumber].answerList[i].isCorrect == true
      ) {
        trueOne = quizData.questionList[questionNumber].answerList[i].body;
        break;
      }
    }
    setAnsweredListData((arr) => [
      ...arr,
      {
        question: quizData.questionList[questionNumber].question,
        selected: body,
        answer: trueOne,
      },
    ]);
    const nextQuestion = questionNumber + 1;
    if (questionNumber + 1 < quizData.questionList.length) {
      setQuestionNumber(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  const startQuiz = () => {
    if (inputName.length === 0) {
      alert("Аты-жөніңіз еңгізілмеді");
    } else {
      setStudent(inputName);
    }
  };
  console.log(inputName);
  const testFinished = async () => {
    console.log(quizData.questionList[questionNumber].question);
    const data = await addResult(
      id,
      student,
      score,
      quizData.questionList.length,
      answeredListData
    );
    console.log(answeredListData);
  };
  if (showScore === true) {
    testFinished();
  }
  const handleChange = (event, value) => {
    setQuestionNumber(value-1);
  };
  return (
    <Container
      fluid
      style={{
        height: "100%",
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {student.length === 0 ? (
        <>
          <Row
            className="mt-3"
            style={{
              flexGrow: "1",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col
              md={6}
              xs={10}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormControl justifyContent="center" sx={{ width: "100%" }}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Аты-жөнің"
                  variant="outlined"
                  name="student"
                  placeholder="Аты-жөнің"
                  autoComplete="on"
                  onChange={(e) => setInputName(e.target.value)}
                />
                <Button
                  style={{
                    backgroundColor: "#01BDAE",
                    color: "white",
                    width: "100%",
                  }}
                  onClick={startQuiz}
                >
                  Бастау
                </Button>
              </FormControl>
            </Col>
          </Row>
        </>
      ) : (
        <>
          {showScore ? (
            <Stack
              sx={{ width: "100%", display:"flex", alignItems:"center", marginTop: "10px"  }}
              // spacing={2}
            >
              <Alert sx={{width:"80%"}}severity="success">
                <AlertTitle>Тест аяқталды</AlertTitle>
                Нәтиже тест иесіне — <strong>жіберілді</strong>
              </Alert>
            </Stack>
          ) : (
            <>
              {quizData.questionList.length && (
                <>
                  <Row
                    className="mt-3"
                    style={{
                      flexGrow: "1",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Col
                      md={8}
                      xs={10}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        backgroundColor: "#EEF2F2",
                        borderRadius: "10px",
                      }}
                    >
                      <div style={{ marginBottom: "20px" }}>
                        <Typography
                          sx={{ fontSize: "20px", fontWeight: "600px" }}
                          mt={2}
                        >
                          {quizData.questionList[questionNumber].question}
                        </Typography>
                      </div>
                      <div
                        className="wtf"
                        style={{ width: "100%", marginBottom: "30px" }}
                      >
                        {quizData.questionList[questionNumber].answerList.map(
                          (answers, ind) => (
                            <Typography
                              mt={2}
                              mb={2}
                              sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              {String.fromCharCode(65 + ind)}.
                              <Button
                                key={answers._id}
                                style={{
                                  backgroundColor: "#01BDAE",
                                  color: "white",
                                  width: "80%",
                                }}
                                onClick={() => {
                                  handleNextQuestion(
                                    answers.isCorrect,
                                    answers.body
                                  );
                                }}
                              >
                                {answers.body}
                              </Button>
                            </Typography>
                          )
                        )}
                      </div>
                    </Col>
                    <Pagination
                      style={{display:"flex", justifyContent:"center", boxShadow:"none", width:"80%", height:"5vh"}}
                      count={quizData.questionList.length}
                      page={questionNumber+1}
                      color="primary"
                      // onChange={handleChange}
                    />
                  </Row>
                </>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Testileu;
