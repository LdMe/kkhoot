

const AnswerForm =({answer,index,onAnswerChange,onAnswerDelete})=>{
    const handleAnswerChange = (e) => {
        const newAnswer = {
            ...answer,
            text: e.target.value
        }
        onAnswerChange(index,newAnswer);
    }
    const handleIsCorrectChange = (e) => {
        const newAnswer = {
            ...answer,
            isCorrect: e.target.checked
        }
        onAnswerChange(index,newAnswer);
    }
    return (
        <section className="answer__form">
            <label htmlFor="answer">Respuesta {index+1}</label>
            <input type="text" name="text" id="text" onChange={handleAnswerChange} value={answer.text}/>
            <label htmlFor="isCorrect">Es correcta</label>
            <input type="checkbox" name="isCorrect" id="isCorrect" onChange={handleIsCorrectChange}  checked={answer.isCorrect}/>
            <button type="button" onClick={() => onAnswerDelete(index)}>Borrar</button>
        </section >
    )
}

export default AnswerForm;