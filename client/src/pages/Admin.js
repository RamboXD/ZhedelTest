import { FormControl, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createQuiz, getTeacherQuizes, getUser } from "../api/quizAPI.js";
import Modal from "../components/Modal.js";
import MyQuiz from "../components/MyQuiz.js";
import { CREATE_ROUTE } from "../utils/consts.js";
import styles from "./Admin.css";
import Test from "./Test.js";
import { jsx, css } from "@emotion/react";

import { CircularProgress, useMediaQuery, useTheme } from "@material-ui/core";

const Admin = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  // const user = JSON.parse(localStorage.getItem("profile"))
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [quizData, setQuizData] = useState({
    name: "",
    // creatorName: `${user?.result.firstName} ${user?.result.lastName}`,
    // backgroundImage: "",
    description: "",
    pointsPerQuestion: 1,
    // isPublic: true,
    // tags: [],
    questionList: [],
  });
  const [quizes, setQuizes] = useState([]);
  // const [isQuizPublic, setIsQuizPublic] = useState(true)
  useEffect(() => {
    async function check() {
      const { data } = await getTeacherQuizes(user.id);
      const userData = await getUser(user.id);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setQuizes(data);
      if (quizes) {
        setLoading(false);
      }
      // console.log(quizes);
    }
    check();
  }, []);
  // const { quizes } = useSelector((state) => state.quiz)
  console.log(firstName);
  const handleQuizSubmit = async () => {
    try {
      const data = await createQuiz(
        firstName,
        lastName,
        quizData.name,
        quizData.description,
        quizData.pointsPerQuestion,
        quizData.List
      );

      navigate(CREATE_ROUTE + `/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuizChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const log = () => {
    console.log(quizData);
  };
  const [previewTestId, setPreviewTestId] = useState(null);
  const [active, setActive] = useState(false);
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
      <Row style={{ height: "100%", flexGrow: "1" }}>
        <Col
          md={6}
          className="eshak"
          xs={12}
          style={{
            borderRight: "solid 2px lightgrey",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ width: "80%", marginBottom: "40px" }}>
            <Button
              style={{ backgroundColor: "#40B7AD" }}
              fullWidth
              onClick={() => {
                // console.log("clicked");
                setActive(true);
              }}
            >
              Жаңа тест құрастыру
            </Button>
          </FormControl>
          <h2 style={{ fontWeight: "bold" }}>Сіз құрастырған тесттар</h2>
          {quizes.map((quiz) => (
            <MyQuiz
              key={quiz._id}
              quiz={quiz}
              setPreviewTestId={setPreviewTestId}
            />
          ))}
        </Col>
        <Col md={6} xs={12}>
          <h2
            style={{
              marginTop: "30px",
              marginLeft: "10px",
              fontWeight: "bold",
            }}
          >
            Тест контенты
          </h2>

          {previewTestId ? (
            <Test previewTestId={previewTestId} />
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
      <Modal active={active} setActive={setActive}>
        <Typography
          style={{ marginBottom: "10px" }}
          className={styles["option-label"]}
        >
          Тест атауы
        </Typography>
        {/* <input
          value={quizData.name}
          type="text"
          name="name"
          onChange={handleQuizChange}
        /> */}
        <TextField
          id="outlined-multiline-flexible"
          label="Атауы"
          multiline
          maxRows={4}
          name="name"
          value={quizData.name}
          onChange={handleQuizChange}
        />
        <Typography
          style={{ marginBottom: "10px" }}
          className={styles["option-label"]}
        >
          Тест сипаттамасы
        </Typography>
        <TextField
          id="outlined-multiline-flexible"
          label="Сипаттама"
          multiline
          maxRows={4}
          name="description"
          value={quizData.description}
          onChange={handleQuizChange}
        />

        <Button
          className="mt-4"
          style={{ backgroundColor: "#40B7AD" }}
          onClick={handleQuizSubmit}
        >
          Құру
        </Button>
      </Modal>
    </div>
  );
};

export default Admin;
