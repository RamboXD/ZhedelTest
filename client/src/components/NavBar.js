import React, { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navigate, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  ADMIN_ROUTE,
  CREATE_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTRATION_ROUTE,
  RESULTS_ROUTE,
  TESTS_ROUTE,
} from "../utils/consts.js";
import logo from "../pics/logo.png";
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { Box, IconButton, Menu } from "@material-ui/core";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuItem, Typography } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu.js';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  let currPath = location.pathname.split("/");
  currPath = currPath[currPath.length - 1];

  const logOut = () => {
    localStorage.clear();
    user.setUser({});
    user.setIsAuth(false);
    navigate(REGISTRATION_ROUTE);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <nav className="mb-3">
      <Nav className="left">
        <a
          onClick={() => navigate(MAIN_ROUTE)}
          className={currPath === "" && "nav-active"}
        >
          <img src={logo} alt="logo" width="30" height="30" />
          <h4 style={{ marginLeft: "5px" }}>
            Jedel<span style={{ color: "#40B7AD" }}>Test</span>
          </h4>
        </a>
      </Nav>
      {user.isAuth ? (
        <Nav className="right">
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon style={{ fontSize: "35px" }} />
              {/* ешак */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
              
            >
              <MenuItem onClick={() => navigate(TESTS_ROUTE)}>
                <Typography textAlign="center">Тест жинағы</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate(ADMIN_ROUTE)}>
                <Typography textAlign="center">Тест құрастыру</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate(RESULTS_ROUTE)}>
                <Typography textAlign="center">Нәтижелер</Typography>
              </MenuItem>
              <MenuItem onClick={() => logOut()}>
                <Typography textAlign="center">Шығу</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
            <a
              onClick={() => navigate(TESTS_ROUTE)}
              className={currPath === "tests" && "nav-active"}
            >
              Тест жинағы
            </a>
            <a
              onClick={() => navigate(ADMIN_ROUTE)}
              className={currPath === "admin" && "nav-active"}
            >
              Тест құрастыру
            </a>
            <a
              onClick={() => navigate(RESULTS_ROUTE)}
              className={currPath === "results" && "nav-active"}
            >
              Нәтижелер
            </a>
            <a onClick={() => logOut()}>Шығу</a>
          </Box>
        </Nav>
      ) : (
        <Nav className="right">
          <a onClick={() => navigate(REGISTRATION_ROUTE)}>Тіркелу/Кіру</a>
        </Nav>
      )}
    </nav>
  );
});
export default NavBar;
