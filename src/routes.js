import React from "react";
import {
  ADMIN_ROUTE,
  CREATE_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTRATION_ROUTE,
  TESTS_ROUTE,
  TEST_ROUTE,
  TESTILEU_ROUTE,
  RESULTS_ROUTE,
  GAMERESULTS_ROUTE,
  SEARCH_ROUTE,
  PUBLIC_TEST_ROUTE,
} from "./utils/consts.js";
import Admin from "./pages/Admin.js";
import Create from "./pages/Create.js";
// import UserInfo from "./pages/UserInfo.js";
import Test from "./pages/Test.js";
import Auth from "./pages/Auth.js";
import Tests from "./pages/Tests.js";
import Main from "./pages/Main.js";
import Testileu from "./pages/Testileu.js";
import Results from "./pages/Results.js";
import GameResults from "./pages/GameResults.js";
import PublicTest from "./pages/PublicTest.js";
export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: <Admin />,
  },
  {
    path: CREATE_ROUTE + "/:id",
    Component: <Create />,
  },
  // {
  //   path: USERINFO_ROUTE,
  //   Component: <UserInfo />,
  // },
  {
    path: TESTS_ROUTE,
    Component: <Tests />,
  },
  {
    path: SEARCH_ROUTE,
    Component: <Tests />,
  },
  {
    path: RESULTS_ROUTE,
    Component: <Results />,
  },
  {
    path: GAMERESULTS_ROUTE + "/:id",
    Component: <GameResults />,
  },
  {
    path: TEST_ROUTE + "/:id",
    Component: <Test />,
  },
  {
    path: PUBLIC_TEST_ROUTE + "/:id",
    Component: <PublicTest />,
  }
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: <Auth />,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: <Auth />,
  },
  {
    path: MAIN_ROUTE,
    Component: <Main />,
  },  
  {
    path: TESTILEU_ROUTE + "/:id",
    Component: <Testileu />,
  },
];
