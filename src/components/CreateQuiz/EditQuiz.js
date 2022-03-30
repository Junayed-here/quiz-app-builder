import './CreateQuiz.css';
import React, {useEffect, useState} from "react";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import QuestionList from './QuestionView/QuestionView';
import {useNavigate, useParams} from "react-router-dom";

function EditQuiz(props) {
    const params = useParams();
    const editQuizId = parseInt(params.quizId);
    const navigate = useNavigate();
    const quizzes = props.quizzes;
    const moveQuestion = props.moveQuestion;
    const createQuiz = props.createQuiz;
    const newQuiz = props.newQuiz;
    let quiz = '';
    let questions = '';

    useEffect(()=>{
        console.log(editQuizId);
        if (editQuizId !== NaN && editQuizId !== undefined){
            props.quizEdit(editQuizId);
        }
    },[]);

    if (newQuiz.quiz){
        quiz = newQuiz.quiz;
        questions = newQuiz.questions;
    }

    function editConfig() {
        props.editQuizConfigOpen();
    }
    function editQuestion(index) {
        console.log(index)
        props.editQuestionOpen(index);
    }
    function addQuestionOpen() {
        props.addQuestionOpen();
    }

    function handleSubmitQuiz() {
        props.handleSubmitQuiz({...props.newQuiz});
    }
    function deleteQuestion(index) {
        console.log(index)
        props.deleteQuestion(index);
    }
    function deleteQuiz(index) {
        console.log(quiz.id)
        props.deleteQuiz(quiz.id);
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
                            <button className="button" onClick={editConfig}>Edit Quiz Config</button>
                            <button className="button" onClick={addQuestionOpen}>Add Question</button>
                            <button className="button" onClick={handleSubmitQuiz}>Submit</button>
                            <button className="button" onClick={deleteQuiz}>Delete this quiz</button>
                        </div>
                    </div>
                    <div className="createQuiz__questions">
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
                                    <div className="no_data">
                                        <p className="no_data__text">Empty</p>
                                    </div>
                                </>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditQuiz;

