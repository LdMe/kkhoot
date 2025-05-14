import { answerQuestion } from "../../../utils/api/gameSession";


const PlayerQuestion = ({question,gameSessionId}) => {

    const handleAnswer = async (answerId) => {
        const username = localStorage.getItem("username");
        const result = await answerQuestion(gameSessionId,username,answerId,question._id);
        console.log(result);
    }
    return (
        <section className="question">
            <h2>{question.question}</h2>
            <ul>
                {question.answers.map((answer) => (
                    <li key={answer._id}><button className="answer__button" onClick={() => handleAnswer(answer._id)}>{answer.text} </button> </li>
                ))}
            </ul>
        </section>
    )
}

export default PlayerQuestion