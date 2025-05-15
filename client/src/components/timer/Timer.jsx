import {useState,useEffect} from "react";

const Timer = ({socket}) =>{
    const [timeLeft, setTimeLeft] = useState(30);
    useEffect(() => {
        socket.on("timer", (timeLeft) => {
            setTimeLeft(timeLeft);
        })
        return () => {
            socket.off("timer");
        }
    }, [socket]);
    return(
        <div>
            <h1>{timeLeft}</h1>
        </div>
    )
}

export default Timer