
const AdminQuestion = ({question}) => {
    return (
        <section className="question">
            <h2>{question.question}</h2>
            <ul>
                {question.answers.map((answer) => (
                    <li key={answer._id}>{answer.text} </li>
                ))}
            </ul>
        </section>
    )
}

export default AdminQuestion