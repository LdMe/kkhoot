

const TriviaCard = ({trivia})=>{

    return (
        <article className="trivia__card">
            <h2>{trivia.title}</h2>
            <section className="trivia__questions">
                {trivia.questions.map((question)=>(
                    <article className="trivia__question">
                        <h3>{question.question}</h3>
                        <ul className="trivia__answers">
                            {question.answers.map((answer)=>(
                                <li>{answer.text}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </section>
        </article>
    )
}

export default TriviaCard