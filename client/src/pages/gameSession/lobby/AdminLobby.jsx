import { useLoaderData } from "react-router-dom"
import { useState, useEffect } from "react";
import { startGameSession, nextQuestion, getQuestion, getGameSessionById, getQuestionStats, getSessionStats } from "../../../utils/api/gameSession"
import AdminQuestion from "../question/AdminQuestion";
import "./Lobby.css"
const Lobby = () => {
    const [question, setQuestion] = useState(null);
    const [gameSession, setGameSession] = useState(useLoaderData());
    const [stats, setStats] = useState(null);
    useEffect(() => {
        // TODO: aqui vamos a conectar por socket y escuchar los eventos
        if (gameSession.state === "started") {
            handleGetQuestion();
        }
        if (gameSession.state === "finished") {
            handleGetStats();
        }
    }, [gameSession])

    const handleGetStats = async () => {
        const stats = await getSessionStats(gameSession._id);
        console.log("stats", stats);
        setStats(stats);
    }
    const handleGetQuestion = async () => {
        const newQuestion = await getQuestion(gameSession._id);
        console.log("newQuestion", newQuestion);
        setQuestion(newQuestion);
    }
    const handleNextQuestion = async () => {
        try {
            if (!stats) {
                const stats = await getQuestionStats(gameSession._id);
                console.log("stats", stats);
                setStats(stats);
                return;
            }
            const newQuestion = await nextQuestion(gameSession._id);
            setQuestion(newQuestion);
            setStats(null);
            console.log("newQuestion", newQuestion);
        } catch (error) {
            console.error(error);
        }
        const newGameSession = await getGameSessionById(gameSession._id);
        if (newGameSession.state !== "started") {
            return setGameSession(newGameSession);
        }
    }
    const handleStartSession = async () => {
        const result = await startGameSession(gameSession._id);
        console.log("start game session", result);
        setGameSession(result);
    }
    if (stats) {
        if (gameSession.state !== "finished") {
            return (
                <div>
                    <h1>Estadisticas</h1>
                    <p>Correctas: {stats.correct}</p>
                    <p>Incorrectas: {stats.incorrect}</p>
                    <p>Total: {stats.total}</p>
                    <p>Porcentaje de aciertos: {stats.correctPercentage}</p>
                    {stats.stats.map((stat) => (
                        <div key={stat.name} className={"player__stat" + (stat.correct ? " player__stat--correct" : " player__stat--incorrect")}>
                            <p>{stat.name}</p>
                            <p>{stat.delay / 1000}ms</p>
                        </div>
                    ))}
                    <>

                        <button onClick={handleNextQuestion}>Siguiente</button>
                    </>
                </div>
            )
        }
        else{
            return (
                <div>
                    <h1>Estadisticas</h1>
                    <p>Correctas: {stats.correct}</p>
                    <p>Incorrectas: {stats.incorrect}</p>
                    <p>Total: {stats.total}</p>
                    <p>Porcentaje de aciertos: {stats.correctPercentage}</p>
                    {stats.players?.map((player) => (
                        <div key={player.name} className={"player__stat" }>
                            <p>{player.name}</p>
                            <p>Correctas: {player.correct }</p>
                            <p>Incorrectas: {player.incorrect}</p>
                            <p>Porcentaje de aciertos: {player.correctPercentage}</p>
                        </div>
                    ))}
                </div>
            )
        }
    }
    return (
        <div>
            <h1>Lobby</h1>
            {gameSession.state !== "finished" && (
                <p className="session__code">Código de la sesión: <span className="session__code--code">{gameSession.code}</span></p>
            )}
            {gameSession.state === "started" && (
                <>
                    {question && <AdminQuestion question={question} gameSessionId={gameSession._id} />}
                    <button onClick={handleNextQuestion}>Siguiente</button>
                </>

            )}
            {gameSession.state === "pending" && (
                <button onClick={handleStartSession}>Comenzar Partida</button>
            )}
            {gameSession.state === "finished" && (
                <p>Partida Terminada</p>
            )}
        </div>
    )
}

export default Lobby