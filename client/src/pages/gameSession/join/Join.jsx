import { useNavigate, useParams} from "react-router-dom";
import { useState } from "react";
import { joinGameSession } from "../../../utils/api/gameSession";
import { saveUsername } from "../../../utils/localStorage";
const Join =()=>{
    const {code: defaultCode} = useParams();
    const [playerName,setPlayerName] = useState("");
    const [code,setCode] = useState(defaultCode || "");
    const navigate = useNavigate();

    const handleJoin = async(e) => {
        e.preventDefault();
        const result = await joinGameSession(code,playerName);
        console.log("join",result);
        saveUsername(playerName);
        navigate("/play/"+result.gameSessionId);
    }
    return(
        <div>
            <h1>Unirse a una partida</h1>
            <form onSubmit={handleJoin}>
                <label>Nombre de Jugador </label>
                <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
                <label>Código de Partida</label>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                <button type="submit">Unirse</button>
            </form>
        </div>
    )
}

export default Join