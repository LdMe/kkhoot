import { useLoaderData } from "react-router-dom"
import { getQuestion } from "../../../utils/api/gameSession"
import { useEffect, useState } from "react";
import PlayerQuestion from "../question/PlayerQuestion";
import Timer from "../../../components/timer/Timer";
import { io } from "socket.io-client";
import { getUsername } from "../../../utils/localStorage";
const UserLobby = () => {
    const gameSession = useLoaderData();
    const [question, setQuestion] = useState(null);
    const [socket, setSocket] = useState(null);
    const [showingStats, setShowingStats] = useState(false);
    useEffect(() => {
        // TODO: aquí añadiremos conexión por socket y listeners
        const newSocket = io("http://localhost:3003");
        const username = localStorage.getItem("username");
        newSocket.emit("join", { username, gameSessionId: gameSession._id });
        newSocket.on("gameSessionStarted", (newGameSession) => {
            console.log("game session started")
            handleGetQuestion();
        })
        newSocket.on("questionStats", (stats) => {
            console.log("stats", stats);
            setShowingStats(true);
        })
        newSocket.on("nextQuestion", (question) => {
            setShowingStats(false);
            handleGetQuestion();
        })
        newSocket.on("gameSessionFinished", (question) => {
            console.log("game session ended")
            alert("partida finalizada");
            // TODO mostra tus estadisticas.
        })

        setSocket(newSocket);
        console.log("game session", gameSession)
        if (gameSession.state === "started") {
            handleGetQuestion();
        }
        return () => {
            newSocket.off("gameSessionStarted");
            newSocket.disconnect();
        }
    }, [gameSession])

    const handleGetQuestion = async () => {
        const newQuestion = await getQuestion(gameSession._id);
        console.log("newQuestion", newQuestion);
        setQuestion(newQuestion);
    }
    if (question) {
        return (
            <>
                <PlayerQuestion showingStats={showingStats} question={question} gameSessionId={gameSession._id} />
                <Timer socket={socket} />
            </>
        )
    }
    return (
        <div>
            <h1>{gameSession.name}</h1>
            {gameSession.players.map((player) => (
                <div key={player._id}>{player.name}</div>
            ))}
        </div>
    )
}

export default UserLobby