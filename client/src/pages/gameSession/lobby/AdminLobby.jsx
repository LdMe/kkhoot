import { useLoaderData } from "react-router-dom"
import { startGameSession } from "../../../utils/api/gameSession"

import "./Lobby.css"
const Lobby = () => {
    const gameSession = useLoaderData()
    const handleStartSession = async () => {
        const result = await startGameSession(gameSession._id);
        console.log("start game session",result);
    }
    return (
        <div>
            <h1>Lobby</h1>
            <p className="session__code">Código de la sesión: <span className="session__code--code">{gameSession.code}</span></p>
            <button onClick={handleStartSession}>Comenzar Partida</button>
        </div>
    )
}

export default Lobby