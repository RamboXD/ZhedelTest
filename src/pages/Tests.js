import React, { useEffect, useState } from "react";
import { getPublicQuizes, getQuizesBySearch } from "../api/quizAPI.js";
import { useLocation, useNavigate } from "react-router-dom";
import { SEARCH_ROUTE, TESTS_ROUTE } from "../utils/consts.js";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import PublicQuiz from "../components/PublicQuizes.js";
import PublicTest from "./PublicTest.js";
import "./Tests.css";
import { Col, Container, Button, Row } from "react-bootstrap";
import { Box, ButtonBase, FormControl, TextField } from "@mui/material";
import { jsx, css } from "@emotion/react";

import { CircularProgress, useMediaQuery, useTheme } from "@material-ui/core";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Tests = () => {
  const location = useLocation();

  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [quizes, setQuizes] = useState({});
  const [search, setSearch] = useState("");
  const [numberOfPages, setNumberOfPages] = useState();
  const navigate = useNavigate();
  const searchPost = async () => {
    if (search.trim() !== "") {
      console.log(search.trim());
      navigate(SEARCH_ROUTE + `?searchQuery=${search || "none"}`);
      console.log(SEARCH_ROUTE + `?searchQuery=${search || "none"}`);
    } else {
      navigate(TESTS_ROUTE);
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  useEffect(() => {
    async function check() {
      console.log(searchQuery);
      if (!searchQuery) {
        const allData = await getPublicQuizes(page);
        console.log(allData);
        setQuizes(allData.data);
        setNumberOfPages(allData.numberOfPages);
      } else {
        const data = await getQuizesBySearch(searchQuery);
        console.log(data);
        setQuizes(data);
      }
      if (quizes) {
        setLoading(false);
      }
    }
    check();
  }, [location]);
  // console.log(quizes);
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
      {quizes.length > 0 && (
        <Row style={{ height: "100%", flexGrow: "1"}}>
          <Col
            className="eshak"
            md={6}
            xs={12}
            style={{ borderRight: "solid 2px lightgrey", display:"flex", flexDirection:"column", alignItems:"center" }}
          >
            <FormControl
              sx={{ marginLeft: "", width: "80%", marginBottom: "40px" }}
            >
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label={"Тесттарды аты бойынша іздеу"}
                fullWidth
                // style={{witdh:"550px"}}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                onClick={searchPost}
                style={{ backgroundColor: "#40B7AD" }}
              >
                {"Іздеу"}
              </Button>
            </FormControl>
            <h2 xs={{fontWeight:"bold" }}>Тесттар</h2>
            {quizes.map((quiz) => (
              // <div>{quiz.name}</div>
              <PublicQuiz
                key={quiz._id}
                quiz={quiz}
                setPreviewTestId={setPreviewTestId}
              />
            ))}
            {searchQuery ? (
              <></>
            ) : (
              <Pagination
                // linksShadow={5}
                style={{ display: "flex", justifyContent: "center", boxShadow:"none"}}
                className="mt-5"
                count={numberOfPages}
                page={Number(page) || 1}
                variant="outlined"
                color="primary"
                renderItem={(item) => (
                  <PaginationItem
                    {...item}
                    component={Link}
                    to={`${TESTS_ROUTE}?page=${item.page}`}
                  />
                )}
              />
            )}
          </Col>
          <Col md={6} xs={12}>
            <h2 style={{marginTop:"30px", marginLeft: "10px", fontWeight:"bold"}}>Тест контенты</h2>
            {previewTestId ? (
              <PublicTest previewTestId={previewTestId} />
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
      )}
    </div>
  );
};
export default Tests;
