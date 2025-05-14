import AnswerForm from "./AnswerForm"

import "./QuestionForm.css"

const QuestionForm = ({question,index,onQuestionChange, onQuestionDelete}) =>{
    const createNewAnswer = () => {
        const newAnswer = {
            text: "",
            isCorrect: false
        }
        onQuestionChange(index,{...question,answers:[...question.answers,newAnswer]})
    }
    const handleAnswerChange = (answerIndex,answer) => {
        console.log("answer",answer)
        const newAnswers = [...question.answers];
        newAnswers[answerIndex] = answer;
        onQuestionChange(index,{...question,answers:newAnswers})
    }
    const handleDeleteAnswer = (answerIndex) => {
        const newAnswers = [...question.answers];
        newAnswers.splice(answerIndex,1);
        onQuestionChange(index,{...question,answers:newAnswers})
    }
    const handleQuestionChange = (e) => {
        onQuestionChange(index,{...question,question:e.target.value})
    }

    return (
        <section className="question__form" >
            <label htmlFor="question">Pregunta {index+1}</label>
            <input type="text" name="question" id="question" value={question.question} onChange={handleQuestionChange}/>
            <button type="button" onClick={() => onQuestionDelete(index)}>Borrar</button>
            <h2>Respuestas</h2>
            <button onClick={createNewAnswer}>Añadir respuesta</button>
            {question.answers.map((answer,index) => (
                <AnswerForm 
                key={index} 
                answer={answer} 
                index={index} 
                onAnswerChange={handleAnswerChange}
                onAnswerDelete={handleDeleteAnswer}
                /> 
            ))}

        </section>
    )
}

export default QuestionForm