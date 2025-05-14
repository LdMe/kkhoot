import fetchData from "./fetch";

async function getGameSessionById(id){
    const gameSession = await fetchData(`/session/${id}`);
    return gameSession;
}

async function startGameSession(id){
    const gameSession = await fetchData(`/session/${id}/start`,"POST");
    return gameSession;
}

async function joinGameSession(code,username){
    const gameSession = await fetchData(`/session/${code}/join`,"POST",{username});
    return gameSession;
}
async function getQuestion(id){
    const question = await fetchData(`/session/${id}/question`);
    return question;
}
async function answerQuestion(sessionId,username,answerId,questionId){
    const gameSession = await fetchData(`/session/${sessionId}/answer`,"POST",{username,answerId,questionId});
    return gameSession;
}
export {
    getGameSessionById,
    startGameSession,
    joinGameSession,
    getQuestion,
    answerQuestion
}