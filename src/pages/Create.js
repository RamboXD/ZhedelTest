import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getQuiz, updateQuiz } from "../api/quizAPI.js";
import AnswerInput from "../components/AnswerInput.js";
import QuestionListItem from "../components/QuestionListItem.js";
import { ADMIN_ROUTE, MAIN_ROUTE } from "../utils/consts.js";
import "./Create.css";

const Create = () => {
  const [svoi, setSvoi] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [isQuestionTrueFalse, setIsQuestionTrueFalse] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [maxCorrectAnswerCount, setMaxCorrectAnswerCount] = useState(1);
  const [isQuestionDataSave, setIsQuestionDataSave] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const { id } = useParams();
  const handleQuestionChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };
  const showQuestion = (index) => {
    var question = quizData.questionList.find(
      (question) => question.questionIndex === index
    );
    setQuestionData(question);
    // setQuestionImage(question.backgroundImage);
    question.questionType === "True/False"
      ? setIsQuestionTrueFalse(true)
      : setIsQuestionTrueFalse(false);
  };

  const [quizData, setQuizData] = useState({
    name: "",
    // creatorName: `${user?.result.firstName} ${user?.result.lastName}`,
    // backgroundImage: "",
    // description: "",
    pointsPerQuestion: 1,
    numberOfQuestions: 0,
    // isPublic: true,
    // tags: [],
    questionList: [],
  });
  const [questionData, setQuestionData] = useState({
    questionType: "Quiz",
    pointType: "Standard",
    // answerTime: 5,
    // backgroundImage: "",
    question: "",
    answerList: [
      { name: "a", body: "", isCorrect: false },
      { name: "b", body: "", isCorrect: false },
      { name: "c", body: "", isCorrect: false },
      { name: "d", body: "", isCorrect: false },
    ],
    questionIndex: 0,
  });
  useEffect(() => {
    async function check() {
      const data = await getQuiz(id);
      if (data.creatorId === user.id) {
        setSvoi(true);
      }
      setQuizData(data);
      setIsPublic(data.isPublic);
      if (data.questionList.length) {
        setQuestionData(data.questionList[data.questionList.length - 1]);
        setIsQuestionDataSave(true);
      }
    }
    check();
  }, [id]);

  // console.log(questionData);
  const updateAnswer = (name, body, index) => {
    setQuestionData((prevState) => ({
      ...prevState,
      answerList: [
        ...prevState.answerList.slice(0, index),
        {
          name: name,
          body: body,
          isCorrect: prevState.answerList[index].isCorrect,
        },
        ...prevState.answerList.slice(index + 1, prevState.answerList.length),
      ],
    }));
  };
  const setCorrectAnswer = (index) => {
    setQuestionData((prevState) => ({
      ...prevState,
      answerList: [
        ...prevState.answerList.slice(0, index),
        {
          name: prevState.answerList[index].name,
          body: prevState.answerList[index].body,
          isCorrect: !prevState.answerList[index].isCorrect,
        },
        ...prevState.answerList.slice(index + 1, prevState.answerList.length),
      ],
    }));

    questionData.answerList[index].isCorrect
      ? setCorrectAnswerCount((prevState) => prevState - 1)
      : setCorrectAnswerCount((prevState) => prevState + 1);
  };
  // ------------------------------------------------------------------------------------------------------
  const validateAnswerFields = () => {
    return questionData.answerList.every((answer) => answer.body !== "");
  };

  const validateCorrectAnswer = () => {
    return questionData.answerList.some((answer) => answer.isCorrect === true);
  };
  // ------------------------------------------------------------------------------------------------------
  const handleQuestionSubmit = () => {
    if (questionData.question === "") {
      alert("Сұрақ берілмеді");
    } else if (!validateAnswerFields()) {
      alert("Нұсқалар толық берілмеді");
    } else if (!validateCorrectAnswer()) {
      alert("Дұрыс жауап таңдалынбады");
    } else {
      setIsQuestionDataSave(true);
      // if true it means question already exist and is only updated
      if (
        quizData.questionList.filter(
          (question) => question.questionIndex === questionData.questionIndex
        )
      ) {
        console.log("I am here!");
        //update list of questions in quizData
        setQuizData((prevState) => ({
          ...prevState,
          questionList: [
            ...prevState.questionList.slice(0, questionData.questionIndex),
            questionData,
            ...prevState.questionList.slice(
              questionData.questionIndex + 1,
              prevState.questionList.length - questionData.questionIndex - 1
            ),
          ],
        }));
      } else {
        //question don't exist - add new one
        setQuizData((prevQuiz) => ({
          ...prevQuiz,
          questionList: [...prevQuiz.questionList, questionData],
        }));
      }
    }
  };
  console.log(quizData);
  const handleQuestionRemove = () => {
    let index = questionData.questionIndex;
    console.log(index);
    setQuizData((prevState) => ({
      ...prevState,

      questionList: [
        ...prevState.questionList.slice(0, index),
        ...prevState.questionList.slice(index+1, prevState.questionList.length),
      ],
    }));

    //update indexes

    quizData.questionList.forEach((question) => {
      if (question.questionIndex > index) {
        question.questionIndex -= 1;
      }
      console.log(question);
    });

    //display previous question or new first one if first was deleted
    if (quizData.questionList.length > 1 && index > 1) {
      showQuestion(index - 1);
    } else if (quizData.questionList.length >= 1 && index === 1) {
      showQuestion(1);
    } else {
      clear();
    }
    setCorrectAnswerCount(0);
  };
  const clear = () => {
    setQuestionData({
      questionType: "Quiz",
      pointType: "Standard",
      // answerTime: 5,
      // backgroundImage: "",
      question: "",
      answerList: [
        { name: "a", body: "", isCorrect: false },
        { name: "b", body: "", isCorrect: false },
        { name: "c", body: "", isCorrect: false },
        { name: "d", body: "", isCorrect: false },
      ],
      questionIndex: quizData.questionList.length,
    });
  };
  // ------------------------------------------------------------------------------------------------------
  const log = () => {
    console.log(quizData);
  };
  //------------------------------------------------------------------------------------------------------
  const addNewQuestion = () => {
    setIsQuestionDataSave(false);
    clear();
    setIsQuestionTrueFalse(false);
    setCorrectAnswerCount(0);
  };
  //------------------------------------------------------------------------------------------------------

  const navigate = useNavigate();

  const handleQuizSubmit = async () => {
    const data = await updateQuiz(
      id,
      quizData.name,
      quizData.pointsPerQuestion,
      quizData.questionList,
      isPublic
    );
    console.log(data);
    navigate(ADMIN_ROUTE);
    console.log(quizData);
  };

  //------------------------------------------------------------------------------------------------------
  console.log(svoi);
  if (svoi === false) {
    return <div>Тексеру</div>;
  } else {
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
        <Row className="mt-3" style={{ flexGrow: "1" }}>
          <Col
            md={6}
            className="eshak"
            xs={12}
            style={{ borderRight: "solid 2px lightgrey" }}
          >
            <h2 style={{ marginBottom: "30px", fontWeight: "bold" }}>
              Сұрақ құрастыру
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#EEF2F2",
              }}
            >
              <TextField
                id="full-width-text-field"
                fullWidth
                multiline
                value={questionData.question}
                onChange={handleQuestionChange}
                type="text"
                name="question"
                label="Сұрақты осында жаз"
              />
              <div
                className="answerContainer"
                style={{ justifySelf: "center" }}
              >
                <div className="answerField">
                  <AnswerInput
                    value={questionData.answerList[0].body}
                    name={"a"}
                    onChange={(e) => {
                      isQuestionTrueFalse
                        ? updateAnswer(e.target.name, "True", 0)
                        : updateAnswer(e.target.name, e.target.value, 0);
                    }}
                    onClick={() => {
                      correctAnswerCount < maxCorrectAnswerCount ||
                      questionData.answerList[0].isCorrect
                        ? setCorrectAnswer(0)
                        : alert("Дұрыс жауап таңдалынған");
                    }}
                    isAnswerCorrect={questionData.answerList[0].isCorrect}
                  />
                </div>
                <div className="answerField">
                  <AnswerInput
                    value={questionData.answerList[1].body}
                    name={"b"}
                    onChange={(e) => {
                      isQuestionTrueFalse
                        ? updateAnswer(e.target.name, "False", 1)
                        : updateAnswer(e.target.name, e.target.value, 1);
                    }}
                    onClick={() => {
                      correctAnswerCount < maxCorrectAnswerCount ||
                      questionData.answerList[1].isCorrect
                        ? setCorrectAnswer(1)
                        : alert("Дұрыс жауап таңдалынған");
                    }}
                    isAnswerCorrect={questionData.answerList[1].isCorrect}
                  />
                </div>
                <div className="answerField">
                  <AnswerInput
                    value={questionData.answerList[2].body}
                    name={"c"}
                    onChange={(e) =>
                      updateAnswer(e.target.name, e.target.value, 2)
                    }
                    onClick={() => {
                      correctAnswerCount < maxCorrectAnswerCount ||
                      questionData.answerList[2].isCorrect
                        ? setCorrectAnswer(2)
                        : alert("Дұрыс жауап таңдалынған");
                    }}
                    isAnswerCorrect={questionData.answerList[2].isCorrect}
                  />
                </div>
                <div className="answerField">
                  <AnswerInput
                    value={questionData.answerList[3].body}
                    name={"d"}
                    onChange={(e) =>
                      updateAnswer(e.target.name, e.target.value, 3)
                    }
                    onClick={() => {
                      correctAnswerCount < maxCorrectAnswerCount ||
                      questionData.answerList[3].isCorrect
                        ? setCorrectAnswer(3)
                        : alert("Дұрыс жауап таңдалынған");
                    }}
                    isAnswerCorrect={questionData.answerList[3].isCorrect}
                  />
                </div>
              </div>
              <div>
                <div
                  style={{
                    marginTop: "50px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    onClick={handleQuestionSubmit}
                    variant="outlined"
                    style={{ borderColor: "#40B7AD", color: "black" }}
                  >
                    {"Сұрақты сақтау"}
                  </Button>
                  <Button
                    variant="outlined"
                    style={{ borderColor: "#40B7AD", color: "black" }}
                    onClick={() => {
                      setIsPublic(!isPublic);
                    }}
                  >
                    {isPublic === true ? (
                      <>Тестты барлығы бағалай алады</>
                    ) : (
                      <>Тестты ешкім көре алмайды</>
                    )}
                  </Button>
                  <Button
                    variant="outlined"
                    style={{ borderColor: "#40B7AD", color: "black" }}
                    onClick={handleQuestionRemove}
                  >
                    {"Сұрақты жою"}
                  </Button>
                </div>
              </div>{" "}
            </div>

            <Button
              style={{
                marginTop: "25px",
                marginBottom: "25px",
                width: "100%",
                backgroundColor: "#40B7AD",
                color: "white",
              }}
              onClick={handleQuizSubmit}
            >
              {"Құрастыруды аяқтау"}
            </Button>
          </Col>
          <Col md={6} xs={12}>
            <h2 style={{ marginBottom: "30px", fontWeight: "bold" }}>
              Тест құрылысы
            </h2>
            <div className={"question-list-container"}>
              <Button
                style={{ backgroundColor: "#40B7AD", color: "white" }}
                onClick={() => {
                  isQuestionDataSave
                    ? addNewQuestion()
                    : alert("Сұрақты бірінші сақтаңыз");
                }}
                className={"add-question-button"}
              >
                {"Сұрақ қосу"}
              </Button>
              <Container>
                <Row className="d-flex mt-5">
                  {quizData.questionList.length > 0 &&
                    quizData.questionList.map((question) => (
                      <QuestionListItem
                        onClick={() => showQuestion(question.questionIndex)}
                        key={question.questionIndex}
                        number={question.questionIndex}
                        type={question.questionType}
                        name={question.question}
                        time={question.answerTime}
                        image={question.backgroundImage}
                        question={question}
                      />
                    ))}
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </div>

      // <div className="quizContainer" style={{marginTop:"10px"}}>
      //   <div className={"question-list"}>
      //   </div>

      // </div>
    );
  }
};

export default Create;
