import React, { useEffect, useRef } from "react";
import { Grid, Button, Box } from "@material-ui/core";
import "./Main.css";
import { Link, useNavigate } from "react-router-dom";
const Main = () => {
  const navigate = useNavigate();
  const getStarted = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (!user) {
      navigate("/registration");
    } else {
      navigate("/admin");
    }
  };
  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      alignContent="center"
      spacing={0}
    >
      <Grid
        container
        justifyContent="space-between"
        direction="column"
        alignItems="center"
        spacing={2}
        style={{
          paddingBottom: "0%",
          marginTop: "0%",
        }}
      >
        {/* <Oiu/> */}
        <Grid
          item
          container
          spacing={0}
          lg={6}
          md={8}
          xs={10}
          justifyContent="center"
          style={{
            height: "100%",
          }}
        >
          <h1
            style={{
              marginTop: "5vh",
              marginBottom: "25px",
              textAlign: "center",
            }}
          >
            Тест құрастырғыңыз келеді ме?
          </h1>
          <p
            style={{
              fontSize: "18px",
              textAlign: "center",
              marginBottom: "2vh",
            }}
          >
            Құрылған сайттың басты мақсаты қолданушыларға оңай әрі тез{" "}
            <span style={{ fontWeight: "bold" }}>тест құрастыру</span>
            ға, шәкірттердің{" "}
            <span style={{ fontWeight: "bold" }}>білімін тексеру</span>
            ге, құрастырылған{" "}
            <span style={{ fontWeight: "bold" }}>тесттармен бөлісу</span>
            ге, басқа қолданушылардың{" "}
            <span style={{ fontWeight: "bold" }}>тесттарын бағалау</span>
            ға көмектесу.
          </p>
        </Grid>
        <button className="btn-main" onClick={getStarted} variant="outlined">
          Бастау
        </button>
      </Grid>
      <Grid container justifyContent="center" spacing={3}>
        <h2
          style={{
            marginTop: "10vh",
            width: "80%",
            marginBottom: "3vh",
          }}
        >
          Кімдерге арналған?
        </h2>
        <Grid
          container
          item
          direction="row"
          justifyContent="center"
          style={{ height: "25rem" }}
          md={3}
          xs={12}
        >
          {/* ------------------------------------------------------------------------------------------------ */}
          <Box
            component="img"
            src="https://stan.kz/download/uploads/news_full1628247438e2802d8acc24f797dad6a2bd1cdeaf92.jpg"
            sx={{
              height: {
                xs: 150,
                md: 200,
              },
              width: {
                xs: "85%",
              },
            }}
          />
          <Grid item container direction="column">
            <h3
              style={{
                textAlign: "center",
                marginBottom: "0px",
              }}
            >
              Ұстаздарға
            </h3>
            <p
              style={{
                fontSize: "15px",
                textAlign: "center",
                margin: "17px",
              }}
            >
              Тесттарды аз уақытта дайындап, оқушылардың білімін тексеруге
              
            </p>
          </Grid>
        </Grid>
        {/* ------------------------------------------------------------------------------------------------ */}
        <Grid
          container
          item
          direction="row"
          justifyContent="center"
          style={{ height: "25rem" }}
          md={3}
          xs={12}
        >
          <Box
            component="img"
            src="https://newsroom.kz/wp-content/uploads/2021/01/e495f31dda23992138e9.jpg"
            sx={{
              height: {
                xs: 150,
                md: 200,
              },
              width: {
                xs: "85%",
              },
            }}
            style={{
              marginBottom: "20px",
            }}
          />
          <Grid
            item
            container
            direction="column"
            // md={6}
            // xs={12}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "0px",
              }}
            >
              Оқушыларға
            </h3>
            <p
              style={{
                fontSize: "15px",
                textAlign: "center",
                margin: "17px",
              }}
            >
              Болашақта келе жатқан емтихандарға сайттағы мұғалімдермен
              дайындалған тесттарды қолдану арқылы дайындалуға
            </p>
          </Grid>
        </Grid>
        {/* ------------------------------------------------------------------------------------------------ */}
        <Grid
          container
          item
          direction="row"
          justifyContent="center"
          style={{ height: "25rem" }}
          md={3}
          xs={12}
        >
          <Box
            component="img"
            src="https://img.kapital.kz/F4ofCu6KmhQ/czM6Ly9rYXBpdGFsLXN0YXRpYy9pbWcvNy83L2YvYi9jL2NhZmMxNWEzOTY2MTJiZjllNTY2N2VlZmI4Yy53ZWJw"
            sx={{
              height: {
                xs: 150,
                md: 200,
              },
              width: {
                xs: "85%",
              },
            }}
            style={{
              marginBottom: "20px",
            }}
          />
          <Grid item container direction="column" order={{ sm: 1, xs: 2 }}>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "0px",
              }}
            >
              Білікті мамандарға
            </h3>
            <p
              style={{
                fontSize: "15px",
                textAlign: "center",
                margin: "17px",
              }}
            >
              Құрастырылған тесттарды бағалап, өз пікірін қалдырып, оқушылардың
              білім сапасының жоғарылуына ат салысуға
            </p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;
