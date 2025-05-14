import { useLoaderData } from "react-router-dom"

const Lobby = () => {
    const gameSession = useLoaderData()
    console.log("gameSession",gameSession)
    return (
        <div>
            <h1>lobby</h1>
            <p className="session__code">Code: <span>{gameSession.code}</span></p>
        </div>
    )
}

export default Lobby