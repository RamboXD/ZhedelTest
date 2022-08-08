// import axios from "axios"
import { $authHost, $host } from "./index.js";
export const createQuiz = async (
  creatorFirstName,
  creatorLastName,
  name,
  description,
  pointsPerQuestion,
  questionList,
  isPublic
) => {
  const { data } = await $authHost.post("api/quizes/", {
    creatorFirstName,
    creatorLastName,
    name,
    description,
    pointsPerQuestion,
    questionList,
    isPublic,
  });
  // console.log(data);
  return data;
};
export const getQuiz = async (id) => {
  const { data } = await $host.get(`api/quizes/${id}`, id);
  // console.log(data);
  return data;
};
export const updateQuiz = async (
  id,
  name,
  pointsPerQuestion,
  questionList,
  isPublic
) => {
  const { data } = await $authHost.patch(`api/quizes/${id}`, {
    name,
    pointsPerQuestion,
    questionList,
    isPublic,
  });
  // console.log(data);
  return data;
};
export const getTeacherQuizes = async (id) => {
  const { data } = await $authHost.get(`api/quizes/teacher/${id}`, id);
  // console.log(data);
  return { data };
};
export const deleteQuiz = async (id) => {
  const { data } = await $authHost.delete(`api/quizes/${id}`, id);
  // console.log(data);
  return data;
};

export const getPublicQuizes = async (page) => {
  const { data } = await $authHost.get(`api/quizes/public?page=${page}`, page);
  // console.log(data);
  return data;
};
export const getQuizesBySearch = async (searchQuery) => {
  console.log(searchQuery);
  const { data } = await $authHost.get(
    `api/quizes/search?searchQuery=${searchQuery || "none"}`,
    searchQuery
  );
  // console.log(data);
  return data;
};

export const likeQuiz = async (id) => {
  const { data } = await $authHost.patch(`api/quizes/${id}/likeQuiz`, id);
  // console.log(data);
  return { data };
};

export const commentQuiz = async (
  id,
  publisherFirstName,
  publisherLastName,
  comment
) => {
  const { data } = await $authHost.post(`api/quizes/${id}/commentQuiz`, {
    publisherFirstName,
    publisherLastName,
    comment,
  });
  // console.log(data);
  return { data };
};
export const getUser = async (id) => {
  const { data } = await $authHost.get(`api/user/${id}`, id);
  // console.log(data);
  return data;
};
