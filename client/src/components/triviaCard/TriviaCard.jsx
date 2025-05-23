import {Link} from "react-router-dom";

const TriviaCard = ({trivia})=>{

    return (
        <article className="trivia__card">
            <h2>{trivia.title}</h2>
            <p>{trivia.questions.length} question{trivia.questions.length === 1 ? "" : "s"}</p>
            <Link to={`/trivias/${trivia._id}`}>Play</Link>
        </article>
    )
}

export default TriviaCard