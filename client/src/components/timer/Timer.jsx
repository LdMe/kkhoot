import {useState,useEffect} from "react";

const Timer = ({socket,onEnd=null}) =>{
    const [timeLeft, setTimeLeft] = useState(30);
    useEffect(() => {
        socket.on("timer", (newTimeLeft) => {
            setTimeLeft(newTimeLeft);
            if(newTimeLeft === 0 && onEnd){
                onEnd();
            }
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