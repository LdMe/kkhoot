

const QuestionForm = ({question,onQuestionChange}) =>{

    return (
        <form>
            <label htmlFor="question">Question</label>
            <input type="text" name="question" id="question" />
        </form>
    )
}