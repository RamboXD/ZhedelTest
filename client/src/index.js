import React, { createContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import UserTestCenter from "./testcenter/UserTestCenter.js";
import "bootstrap/dist/css/bootstrap.min.css";
import TestTestCenter from "./testcenter/TestTestCenter.js";

export const Context = createContext(null);

createRoot(document.getElementById("root")).render(
  <Context.Provider
    value={{
      user: new UserTestCenter(),
      test: new TestTestCenter(),
    }}
  >
    <App />
  </Context.Provider>
);
