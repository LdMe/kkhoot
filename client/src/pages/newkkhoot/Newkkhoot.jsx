import {useState} from "react";
import QuestionForm from "./QuestionForm";
import {createTrivia} from "../../utils/api/trivia";
const Newkkhoot = () => {
    const  [title,setTitle] = useState("")
    const [questions,setQuestions] = useState([]);

    const createNewQuestion = () =>{
        const newQuestion  = {
            question: "",
            answers: []
        }
        setQuestions(oldQuestions => [...oldQuestions,newQuestion]);
    }
    
    const editQuestion = (index,question) => {
        const newQuestions = [...questions];
        newQuestions[index] = question;
        setQuestions(newQuestions);
    }
    const handleDeleteQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index,1);
        setQuestions(newQuestions);
    }
    const handleSaveTrivia = async() => {
        const newTrivia = {
            title,
            questions
        }
        console.log(newTrivia);
        const result = await createTrivia(newTrivia);
        console.log(result);

    }
    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
    }

    return (
        <section className="trivia__new">
            <h1>New Trivia</h1>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={title} onChange={handleTitleChange}  />
            <button onClick={handleSaveTrivia}>Save</button>
            <h2>{questions.length} Question{questions.length === 1 ? "" : "s"}</h2>
            <button onClick={createNewQuestion}>Add Question</button>
            {questions.map((question,index) => (
                <QuestionForm 
                key={index} 
                question={question}  
                index={index} 
                onQuestionChange={editQuestion}
                onQuestionDelete={handleDeleteQuestion}
                />
            ))}
            
        </section>
    )
}

export default Newkkhoot