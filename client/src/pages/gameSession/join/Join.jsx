import { useParams} from "react-router-dom";
import { useState } from "react";
import { joinGameSession } from "../../../utils/api/gameSession";

const Join =()=>{
    const {code: defaultCode} = useParams();
    const [playerName,setPlayerName] = useState("");
    const [code,setCode] = useState(defaultCode || "");

    const handleJoin = async(e) => {
        e.preventDefault();
        const result = await joinGameSession(code,playerName);
        console.log("join",result);
    }
    return(
        <div>
            <h1>Join</h1>
            <form onSubmit={handleJoin}>
                <label>Player Name</label>
                <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
                <label>Game Code</label>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                <button type="submit">Join</button>
            </form>
        </div>
    )
}

export default Join