import {useState} from "react";
import QuestionForm from "./QuestionForm";
import {createTrivia} from "../../utils/api/trivia";

import "./Newkkhoot.css"
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
        if(!validateQuestions()){
            console.log("not valid");
            return;
        }
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
    /**
     * Función que valida todas las preguntas para que tengan al menos 2 respuestas posibles, entre ellas al menos 1 correcta y que cada pregunta tenga su pregunta
     */
    const validateQuestion = (question) =>{
        if(!question.question){
            return false;
        }
        if(question.answers.length < 2){
            return false;
        }
        const correctAnswers = question.answers.filter(answer => answer.isCorrect);
        if(correctAnswers.length < 1){
            return false;
        }
        const emptyAnswer = question.answers.find(answer => !answer.text);
        if(emptyAnswer){
            return false;
        } 
        return true;
    }
    const validateQuestions=() => {
        if(!title){
            return false;
        }
        if(questions.length < 1){
            return false;
        }
        return questions.every(validateQuestion);
    }

    return (
        <section className="trivia__new">
            <input className="trivia__title" type="text" name="title" id="title" value={title} onChange={handleTitleChange}  placeholder="Título" />
            <button onClick={handleSaveTrivia}>Guardar</button>
            <h2>{questions.length} Pregunta{questions.length === 1 ? "" : "s"}</h2>
            <button onClick={createNewQuestion}>Nueva pregunta</button>
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