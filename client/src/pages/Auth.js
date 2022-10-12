import React, { useContext, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { login, registration } from "../api/userAPI.js";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { Context } from "../index.js";
import { MAIN_ROUTE } from "../utils/consts.js";

const Auth = observer(() => {
  const initialState = {
    // userType: "",
    firstName: "",
    lastName: "",
    // userName: "",
    email: "",
    password: "",
    // confirmPassword: "",
  };

  let navigate = useNavigate();
  const { user } = useContext(Context);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [formData, setFormData] = useState(initialState);

  const clickReg = async () => {
    try {
      let data;
      data = await registration(formData.email, formData.password, formData.firstName, formData.lastName);
      user.setUser(user);
      user.setIsAuth(true);
      localStorage.setItem("profile", JSON.stringify(data));
      navigate(MAIN_ROUTE);
      window.location.reload();
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  const clickLog = async () => {
    try {
      let data;
      // console.log(formData);
      data = await login(formData.email, formData.password);
      localStorage.setItem("profile", JSON.stringify(data));
      user.setUser(user);
      user.setIsAuth(true);
      navigate(MAIN_ROUTE);
      window.location.reload();
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  // console.log(formData);
  return (
    <Container
      fluid
      className="authP d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Кіру</span>
                  <span>Тіркелу</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Кіру</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              name="email"
                              className="form-style"
                              placeholder="Сенің Поштаң"
                              id="logemail"
                              autoComplete="off"
                              // value={email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="password"
                              className="form-style"
                              placeholder="Құпия Сөз"
                              id="logpass"
                              autoComplete="off"
                              // value={password}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <Button onClick={clickLog} className="btn mt-4">
                            енгізу
                          </Button>
                          <p className="mb-0 mt-4 text-center">
                            <a href="#0" className="link">
                              Құпия сөзді ұмыттыңыз ба?
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Тіркелу</h4>
                          {/* <div className="form-group">
                            <input
                              type="text"
                              name="logname"
                              className="form-style"
                              placeholder="Толық аты-жөнің"
                              id="logname"
                              autoComplete="off"
                               autoComplete="off"
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div> */}
                          <div className="form-group mt-2">
                            <input
                              type="string"
                              name="firstName"
                              className="form-style"
                              placeholder="Атыңыз"
                              id="logfirstname"
                              autoComplete="off"
                              // value={password}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="string"
                              name="lastName"
                              className="form-style"
                              placeholder="Тегіңіз"
                              id="loglastname"
                              autoComplete="off"
                              // value={password}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="email"
                              className="form-style"
                              placeholder="Поштаңыз"
                              id="logemail"
                              autoComplete="off"
                              // value={email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="password"
                              className="form-style"
                              placeholder="Құпия Сөз"
                              id="logpass"
                              autoComplete="off"
                              // value={password}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <Button onClick={clickReg} className="btn mt-4">
                            енгізу
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
});

export default Auth;
