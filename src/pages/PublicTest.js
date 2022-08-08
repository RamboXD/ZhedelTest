import React, { useEffect, useState } from "react";
import { Container, Col, Image, Row, Button, Card } from "react-bootstrap";
import {
  CREATE_ROUTE,
  MAIN_ROUTE,
  TESTILEU_ROUTE,
  TEST_ROUTE,
} from "../utils/consts.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { commentQuiz, getQuiz, getUser } from "../api/quizAPI.js";
import {
  Input,
  InputLabel,
  FormControl,
  ButtonBase,
  Typography,
} from "@mui/material";

const PublicTest = ({ previewTestId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [opinion, setOpinion] = useState("");
  const [showCorrect, setShowCorrect] = useState(true);
  const id = previewTestId;
  const navigate = useNavigate();
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
      const data = await getQuiz(id);
      const userData = await getUser(user.id);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setQuizData(data);
    }
    check();
  }, [id]);

  const commentTest = async () => {
    try {
      console.log(quizData._id);
      const data = await commentQuiz(
        quizData._id,
        firstName,
        lastName,
        opinion
      );
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(quizData);
  return (
    <Container>
      <>
        <Row className="d-flex mt-5">
          <>{quizData.name}</>
          <hr />
          {quizData.questionList.map((test) => (
            <>
              <div>{test.question}</div>
              <div>
                {test.answerList.map((answer) => (
                  <>
                    {showCorrect === true ? (
                      <>
                        {answer.isCorrect === true ? (
                          <div style={{ backgroundColor: "#5ceb7a" }}>
                            {answer.name}. {answer.body}
                          </div>
                        ) : (
                          <div>
                            {answer.name}. {answer.body}
                          </div>
                        )}
                      </>
                    ) : (
                      <div>
                        {answer.name}. {answer.body}
                      </div>
                    )}
                  </>
                ))}
              </div>
            </>
          ))}
          <Button
            style={{
              marginTop: "30px",
              width: "auto",
              backgroundColor: "#40B7AD",
            }}
            onClick={() => {
              setShowCorrect(!showCorrect);
            }}
          >
            Дұрыс жауаптарын көру
          </Button>
        </Row>
        <Row style={{ display: "grid", marginBottom:"30px" }}>
          <FormControl variant="standard">
            <InputLabel htmlFor="component-simple">
              Пікіріңізді жазыңыз
            </InputLabel>
            <Input
              id="component-simple"
              onChange={(e) => {
                setOpinion(e.target.value);
              }}
            />
          </FormControl>
          <Button
            onClick={commentTest}
            style={{
              marginTop: "5px",
              justifySelf: "flex-end",
              width: "auto",
              backgroundColor: "#40B7AD",
            }}
          >
            Пікір қалдыру
          </Button>
        </Row>
        <Row>
          {quizData.comments &&
            quizData.comments.map((comment) => (
              <div
                key={comment._id}
                style={{ marginBottom: "30px", backgroundColor: "#F2F2F2", borderRadius:"10px" }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    textAlign: "start",
                    fontWeight: "600",
                    fontFamily: "Roboto, Arial, sans-serif",
                  }}
                >
                  {comment.publisherLastName} {comment.publisherFirstName}
                </Typography>
                <Typography
                  style={{
                    fontSize: "14px",
                    textAlign: "start",
                    fontWeight: "400",
                    fontFamily: "Roboto, Arial, sans-serif",
                  }}
                >
                  {comment.comment}
                </Typography>
              </div>
            ))}
        </Row>
      </>
    </Container>
  );
};

export default PublicTest;
