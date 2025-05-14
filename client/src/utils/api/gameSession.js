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

export {
    getGameSessionById,
    startGameSession,
    joinGameSession
}