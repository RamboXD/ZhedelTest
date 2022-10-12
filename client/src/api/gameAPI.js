import { $authHost, $host } from "./index.js";
export const createGame = async (quizId, gameName) => {
  console.log(quizId);
  const { data } = await $authHost.post("api/game/", {quizId, gameName});
  return data;
};
export const getGame = async (gameId) => {
    console.log(gameId);
    const { data } = await $host.get(`api/game/${gameId}`);
    console.log(data);
  
    return data;
};
export const getGames = async () => {
  const { data } = await $authHost.get(`api/game/`);
  console.log(data);
  return data;
};

export const addResult = async (gameId, name, score, maxScore, answeredListData) => {
    console.log(gameId);
    const { data } = await $host.post(`api/game/results/${gameId}`, {name, score, maxScore, answeredListData});
    // console.log(data);
  
    return data;
};
export const deleteGames = async (id) => {
  const { data } = await $authHost.delete(`api/game/${id}`, id);
  // console.log(data);
  return data;
};
