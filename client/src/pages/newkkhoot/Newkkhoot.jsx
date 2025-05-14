import {useState} from "react";

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
    const createNewAnswer = () => {
        const newAnswer = {
            text: "",
            isCorrect: false
        }
    }

    return (
        <section className="trivia__new">
            <h1>New Trivia</h1>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title"  />
            
        </section>
    )
}