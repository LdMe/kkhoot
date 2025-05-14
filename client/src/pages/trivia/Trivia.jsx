import { useLoaderData,useNavigate } from "react-router-dom";
import { startTrivia } from "../../utils/api/trivia";

const Trivia = () => {
    const trivia = useLoaderData();
    const navigate = useNavigate();
    const handleStartTrivia = async () => {
        const result  = await startTrivia(trivia._id);
        console.log(result);
        navigate(`/sessions/${result._id}`);

    }
    return (
        <section className="trivia">
            <h1>{trivia.title}</h1>
            <button onClick={handleStartTrivia}>Nueva Partida</button>
            {trivia.questions.map((question) => (
                <div key={question._id}>
                    <h2>{question.question}</h2>
                    <ul>
                        {question.answers.map((answer) => (
                            <li key={answer._id}>{answer.text} {answer.isCorrect ? "✅" : "❌"}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    )
}

export default Trivia;