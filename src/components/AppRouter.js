import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "../index.js";
import { authRoutes, publicRoutes } from "../routes.js";
import { MAIN_ROUTE } from "../utils/consts.js";
import oyuBlue from "../pics/oyuBlue.png";
import "./AppRouter.css";

const AppRouter = () => {
  const { user } = useContext(Context);

  // console.log(user);
  return (
    <div
      className="photo min-vh-100"
      style={{
        backgroundImage: `url(${oyuBlue})`,
        backgroundSize: "contain",
        display: "flex",
        flexDirection: "column",
        backgroundPosition: "inherit",
      }}
    >
      <Routes>
        {user.isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={Component} exact />
          ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} exact />
        ))}
        <Route path="*" element={<Navigate to={MAIN_ROUTE} replace />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
