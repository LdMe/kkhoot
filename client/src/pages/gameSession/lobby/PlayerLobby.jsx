import { useLoaderData } from "react-router-dom"
import { getQuestion } from "../../../utils/api/gameSession"
import { useEffect, useState } from "react";
import PlayerQuestion from "../question/PlayerQuestion";
const UserLobby = () => {
    const gameSession = useLoaderData();
    const [question, setQuestion] = useState(null);
    useEffect(() => {
        // TODO: aquí añadiremos conexión por socket y listeners
        console.log("game session", gameSession)
        if (gameSession.state === "started") {
            handleGetQuestion();
        }
    }, [gameSession])

    const handleGetQuestion = async () => {
        const newQuestion = await getQuestion(gameSession._id);
        console.log("newQuestion", newQuestion);
        setQuestion(newQuestion);
    }
    if (question) {
        return <PlayerQuestion question={question} gameSessionId={gameSession._id} />
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