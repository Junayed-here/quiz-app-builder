import './CreateQuiz.css';
import React, {useEffect, useState} from "react";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import QuestionList from './QuestionView/QuestionView';
import {useNavigate} from "react-router-dom";

function CreateQuiz(props) {
    const   navigate = useNavigate();
    const moveQuestion = props.moveQuestion;
    const createQuiz = props.createQuiz;
    const newQuiz = props.newQuiz;
    const [newData, setNewData] = useState(!!newQuiz.quiz);
    let quiz = '';
    let questions = '';

    useEffect(()=>{
        if(!newData){
            navigate('/');
        }
    },[newData])

    // console.log(newQuiz.quiz);
    // console.log(newData);

    if (createQuiz && newQuiz.quiz !== undefined){
        quiz = newQuiz.quiz;
        questions = newQuiz.questions;
    }
    function editConfig() {
        props.editQuizConfigOpen();
    }
    function editQuestion(index) {
        // console.log(index)
        // console.log(newQuiz)
        props.editQuestionOpen(index);
    }
    function addQuestionOpen() {
        props.addQuestionOpen();
    }
    function deleteQuestion(index) {
        // console.log(index)
        props.deleteQuestion(index);
    }
    function handleSubmitQuiz() {
        // console.log(newQuiz.questions.length);
        if (newQuiz.questions.length < 2){
            alert("please add minimum 2 questions!");
        }else{
            props.handleSubmitQuiz({...props.newQuiz});
        }
    }

    return (
        <div className="createQuiz">
            <div className="container">
                <div className="createQuiz__top_info">
                    <h1 className="createQuiz__title">Start Creating your Quiz.</h1>
                    <h2 className="createQuiz_subheading">A great many questions can be a real challenge.</h2>
                </div>
                <div className="createQuiz__view">
                    <div className="createQuiz__ConfigView">
                        <h3 className="createQuiz__ConfigView__title">{quiz.title}</h3>
                        <p className="createQuiz__ConfigView__view">Question view: {quiz.view}</p>
                        <div className="createQuiz__ConfigView__actions">
                            <button className="button button-blue" onClick={editConfig}>Edit Config</button>
                            <button className="button button-blue" onClick={handleSubmitQuiz}>Submit</button>
                        </div>
                    </div>
                    <div className="createQuiz__questions">
                        <button className="button button-blue" onClick={addQuestionOpen}>Add Question</button>
                        {
                            (questions !== '')
                                ?
                                <DndProvider backend={HTML5Backend}>
                                    <QuestionList
                                        questions={questions}
                                        moveQuestion={moveQuestion}
                                        handleEditQuestion={editQuestion}
                                        deleteQuestion={deleteQuestion}
                                    />
                                </DndProvider>
                                :
                                <>
                                    <div className="noQuiz">
                                        <p className="noQuiz__text">You haven't added any question yet.</p>
                                    </div>
                                </>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateQuiz;

