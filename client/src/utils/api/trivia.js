import fetchData from "./fetch.js";
import { redirect } from "react-router-dom";

async function getMyTrivias(){
    const trivias = await fetchData("/trivia")
    if(trivias.error && trivias.status === 401){
        return redirect("/login");
    }
    return trivias;
}


export {
    getMyTrivias
}