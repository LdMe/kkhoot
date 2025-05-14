import fetchData from "./fetch.js";
import { redirect } from "react-router-dom";

async function getMyTrivias(){
    const trivias = await fetchData("/trivia")
    if(trivias.error && trivias.status === 401){
        return redirect("/login");
    }
    return trivias;
}

async function getTriviaById(id){
    const trivia = await fetchData(`/trivia/${id}`);
    return trivia;
}

async function createTrivia(data){
    const trivia = await fetchData("/trivia","POST",data);
    return trivia;
}

async function startTrivia(id){
    const trivia = await fetchData(`/trivia/${id}/start`,"POST");
    console.log("start trivia",trivia);
    return trivia;
}


export {
    getMyTrivias,
    createTrivia,
    getTriviaById,
    startTrivia
}