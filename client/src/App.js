/** @jsxRuntime classic */
/** @jsx jsx */
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { check } from "./api/userAPI.js";
import AppRouter from "./components/AppRouter.js";
import Footer from "./components/Footer.js";
import NavBar from "./components/NavBar.js";
import { Context } from "./index.js";
import { jsx, css } from "@emotion/react";
import { CircularProgress, useMediaQuery, useTheme } from "@material-ui/core";
import "./App.css";
const App = observer(() => {
  const { user } = useContext(Context);

  const [loading, setLoading] = useState(true);

  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      check()
        .then((data) => {
          user.setUser(true);
          user.setIsAuth(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  }, []);

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
      // <div className="d-flex justify-content-center">
      //   <Spinner
      //     style={{ height: "1000px", width: "1000px" }}
      //     animation={"grow"}
      //     variant="info"
      //   />
      // </div>
      <div css={styles.root}>
        <CircularProgress
          thickness={5}
          size={isMobile ? 75 : 100}
          disableShrink
          css={styles.circularProgress}
        />
      </div>

      // <CircularProgress />
    );
  }
  const showNavContext = React.createContext(null);
  return (
    <BrowserRouter>
      <div className="d-flex flex-column">
        <NavBar />
        <AppRouter />
        <Footer />
      </div>
    </BrowserRouter>
  );
});

export default App;
