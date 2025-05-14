import { useLoaderData } from "react-router-dom"
import {useState,useEffect} from "react";
import { startGameSession, nextQuestion, getQuestion } from "../../../utils/api/gameSession"
import AdminQuestion from "../question/AdminQuestion";
import "./Lobby.css"
const Lobby = () => {
    const [question, setQuestion] = useState(null);
    const gameSession = useLoaderData();

    useEffect(() => {
        // TODO: aqui vamos a conectar por socket y escuchar los eventos
        if (gameSession.state === "started") {
            handleGetQuestion();
        }
    }, [gameSession])
    const handleGetQuestion = async () => {
        const newQuestion = await getQuestion(gameSession._id);
        console.log("newQuestion", newQuestion);
        setQuestion(newQuestion);
    }
    const handleNextQuestion = async () => {
        const newQuestion = await nextQuestion(gameSession._id);
        console.log("newQuestion", newQuestion);
        setQuestion(newQuestion);
    }
    const handleStartSession = async () => {
        const result = await startGameSession(gameSession._id);
        console.log("start game session", result);
    }

    return (
        <div>
            <h1>Lobby</h1>
            <p className="session__code">Código de la sesión: <span className="session__code--code">{gameSession.code}</span></p>
            {question && <AdminQuestion question={question} gameSessionId={gameSession._id} />}
            {gameSession.state === "pending" && <button onClick={handleStartSession}>Comenzar Partida</button>}
            {gameSession.state === "started" && <button onClick={handleNextQuestion}>Siguiente Pregunta</button>}
            {gameSession.state === "finished" && <p>Partida Terminada</p>}
        </div>
    )
}

export default Lobby