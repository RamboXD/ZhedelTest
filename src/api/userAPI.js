import { $authHost, $host } from "./index.js";
import jwt_decode from "jwt-decode";
import { Context } from "../index.js";

export const registration = async (email, password, firstName, lastName) => {
  const { data } = await $host.post("api/auth/registration", {
    email,
    password,
    firstName,
    lastName
  });
  // console.log(data)
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (email, password) => {
  // console.log(email);
  const { data } = await $host.post("api/auth/login", { email, password });
  // console.log(data.token);
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/auth/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
