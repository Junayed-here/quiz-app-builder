import './CreateQuiz.css';
import React, {useEffect, useState} from "react";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import update from "immutability-helper";
import QuestionList from './QuestionView/QuestionView';



function CreateQuiz(props) {
    const createQuiz = props.createQuiz;
    let quiz = '';
    let questions = '';
    if (createQuiz){
        quiz = props.newQuiz.quiz ? props.newQuiz.quiz : '';
        questions = props.newQuiz.questions ? props.newQuiz.questions : '';
        // console.log(props.newQuiz)
    }else{
        quiz = props.quiz.quiz;
        questions = props.quiz.questions;
        // console.log(props.quiz)
    }
    // console.log(props.newQuiz);

    function editConfig() {
        props.handleEditQuizConfigOpen(quiz);
    }
    function editQuestion(index) {
        props.handleAddQuestionOpen(index);
    }
    function newQuestion() {
        props.handleNewQuestionOpen();
    }

    function handleSubmitQuiz(data) {
        console.log(data)
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
                            <button className="button" onClick={newQuestion}>Add Question</button>
                            <button className="button" onClick={handleSubmitQuiz}>Submit</button>
                        </div>
                    </div>
                    <div className="createQuiz__questions">
                        {
                            (questions !== '')
                                ?
                                <DndProvider backend={HTML5Backend}>
                                    <QuestionList
                                        questions={questions}
                                        moveQuestion={props.moveQuestion}
                                        handleEditQuestion={editQuestion}
                                        handleNewQuestion={newQuestion}
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

export default CreateQuiz;

