import {useState,useEffect} from "react";
import { useLoaderData } from "react-router-dom";
import TriviaCard from "../../components/triviaCard/TriviaCard";
const Mykkhoots = () =>{
    const trivias = useLoaderData();
    console.log("trivias",trivias);
    return (
        <section className="trivias">
            <h1>Mis Trivias</h1>
            {trivias.map((trivia) => (
                <TriviaCard key={trivia._id} trivia={trivia} />
            ))}
        </section>

    )

}

export default Mykkhoots