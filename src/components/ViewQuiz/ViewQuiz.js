import dragIcon from "../../images/drag.svg";
import editIcon from "../../images/edit.svg";
import deleteIcon from "../../images/delete.svg";
import './ViewQuiz.css';
import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import CheckboxRadio from "../Form/CheckboxRadio/CheckboxRadio";
import update from "immutability-helper";
function randomGen() {
    return Math.floor(100000 + Math.random() * 900000);
}

function ViewQuiz(props) {
    const params = useParams();
    // console.log(params.quizId);
    const quizId = parseInt(params.quizId);
    const quizzes = props.quizzes;
    let totalPoints = 0;
    let quiz , questions, quizView = '';
    if (quizzes.length > 0){
        quizzes.map((item,index)=>{
            if(item.quiz.id === quizId){
                quiz = item.quiz;
                quizView = item.quiz.view;
                questions = item.questions;
            }
        });
    }
    const quizViewAll = (quizView === "all");
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [allAnswered, setAllAnswered] = useState(false);
    let notAnswered = true;
    let answersCollectionFromQuiz = [];
    let answersCollectionFromUser = [];
    function quizAnswersWithPoints() {
        questions.map((question) => {
            const points = question.points;
            totalPoints += parseInt(points);
            const correctAnswers = [];
            question.answers.map((answer,index) => {
                if (answer.IsCorrect){
                    correctAnswers.push(index)
                }
            });
            answersCollectionFromQuiz.push({points,correctAnswers})
        });
    }
    quizAnswersWithPoints();
    function collectUserAnswers(questionIndex,answerIndex,method,questionWrapper) {
        const customDomSelect = document.getElementById(questionWrapper);
        if (method === "ADD"){
            let added = false;
            if(answersCollectionFromUser.length === 0){
                answersCollectionFromUser.push({questionIndex: questionIndex,answerIndex: [answerIndex]});
                added = true;
                // console.log(answersCollectionFromQuiz, answersCollectionFromUser);
            }
            answersCollectionFromUser.map((item,index)=>{
                if(item.questionIndex === questionIndex && !added){
                    answersCollectionFromUser[index].answerIndex.push(answerIndex);
                    added = true;
                }
            });
            (!added) ? answersCollectionFromUser.push({questionIndex: questionIndex,answerIndex: [answerIndex]}) : '';
            (customDomSelect !== null)?customDomSelect.classList.remove('not-answered'):'';
            // console.log(answersCollectionFromUser);
        }else if (method === "REMOVE"){
            answersCollectionFromUser.map((item,index)=>{
                // console.log(item ,questionIndex);
                if(item.questionIndex === questionIndex){
                    const deleteItemIndex = answersCollectionFromUser[index].answerIndex.indexOf(answerIndex);
                    answersCollectionFromUser[index].answerIndex.splice(deleteItemIndex, 1);

                    if(answersCollectionFromUser[index].answerIndex.length === 0 && customDomSelect !== null) {
                        customDomSelect.classList.add('not-answered');
                    }else if(customDomSelect !== null){
                        customDomSelect.classList.remove('not-answered');
                    }
                }
            });
        }
        // console.log(answersCollectionFromUser);
    }
    function scoreDetermine() {
        let currentScore = 0;
        answersCollectionFromUser.map((item)=>{
            const quizAnswer = answersCollectionFromQuiz[item.questionIndex].correctAnswers;
            const userAnswer = item.answerIndex;
            if (quizAnswer.length === userAnswer.length){
                const checkValues =  !quizAnswer.map((e, i) => e == userAnswer[i]).includes(false)
                if(checkValues){
                    currentScore = currentScore + parseInt(answersCollectionFromQuiz[item.questionIndex].points);
                }
            }
        });
        setScore(currentScore);
    }
    function checkUncheck(e) {
        let method = '';
        let questionIndex = e.target.getAttribute('data-question-index');
        let answerIndex = e.target.getAttribute('data-answer-index');
        let questionWrapper = e.target.getAttribute('data-wrapper');
        e.target.checked ? method = "ADD" : method = "REMOVE";
        collectUserAnswers(parseInt(questionIndex),parseInt(answerIndex),method,questionWrapper);
    }
    function checkUnmarkQuestion() {
        const notAnsweredDom = document.getElementsByClassName('not-answered');
        (notAnsweredDom.length === 0) ? notAnswered = false : notAnswered = true;
    }
    function handleFinishTest() {
        checkUnmarkQuestion();
        if (!notAnswered){
            setScore(0);
            scoreDetermine();
            setAllAnswered(true);
        }else{
            alert('please answer all question');
        }
    }
    function handleNextQuestion() {
        let checkboxes = document.getElementsByClassName('answerCheckBox');
        notAnswered = true;
        checkUnmarkQuestion();
        if (!notAnswered){
            answersCollectionFromUser.map((item)=>{
                const quizAnswer = answersCollectionFromQuiz[item.questionIndex].correctAnswers;
                const userAnswer = item.answerIndex;
                const checkValues =  !quizAnswer.map((e, i) => e === userAnswer[i]).includes(false)
                if(checkValues){
                    setScore(score + parseInt(answersCollectionFromQuiz[item.questionIndex].points))
                }
            })

            if ((currentQuestionIndex + 1) < questions.length){
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }else {
                setAllAnswered(true);
            }

            for (let i=0; i<checkboxes.length;i++){
                checkboxes[i].checked = false;
            }
        }else{
            alert('please answer all question');
        }
    }

    console.log(allAnswered);
    return(
        <>
            {
                (!allAnswered) ?
                    (
                        <div className="ViewQuiz">
                            <h3 className="ViewQuiz__title">{quiz.title}</h3>
                            <div className="createQuiz__questions">
                                {
                                    (quizViewAll)
                                        ?
                                        (
                                            <>
                                                {
                                                    questions.map((question,index)=>(
                                                        <div className="viewQuestion__box not-answered" id={`viewQuestion-${index}`} key={index}>
                                                            <div className="createQuiz__question_question">
                                                                {
                                                                    (question.img !== '' && question.img !== null) &&
                                                                    (
                                                                        <img className="createQuiz__question_img" src={question.img} alt="Img"/>
                                                                    )

                                                                }
                                                                <h3 className="createQuiz__questionTitle">
                                                                    {index + 1}. {question.title}
                                                                </h3>
                                                            </div>

                                                            <div className={`createQuiz__question__answers question-type-${question.type}`}>
                                                                {
                                                                    question.answers.map((answer, answerIndex)=>(
                                                                        <label className="label label_answerCheckBox" key={answerIndex}>
                                                                            <div
                                                                                className={`answerCheckBox ${(answer.IsCorrect) ? 'correct' : ''}`}
                                                                            >
                                                                                {
                                                                                    (answer.img !== '' && answer.img !== null) &&
                                                                                    (
                                                                                        <img className="answerCheckBox__img" src={answer.img} alt="Img"/>
                                                                                    )
                                                                                }
                                                                                <input
                                                                                    name={`question-${index}`}
                                                                                    type={(question.type === "single") ? 'radio' : 'checkbox'}
                                                                                    className="answerCheckBox"
                                                                                    data-question-index={index}
                                                                                    data-answer-index={answerIndex}
                                                                                    data-wrapper={`viewQuestion-${index}`}
                                                                                    onChange={(e)=>{checkUncheck(e)}}
                                                                                />
                                                                                {answer.title}
                                                                            </div>
                                                                        </label>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </>
                                        )
                                        :
                                        (
                                            <div className="viewQuestion__box not-answered" id={`viewQuestion-${currentQuestionIndex}`}>
                                                <div className="createQuiz__question_question">
                                                    {
                                                        (questions[currentQuestionIndex].img !== '' && questions[currentQuestionIndex].img !== null) &&
                                                        (
                                                            <img className="createQuiz__question_img" src={questions[currentQuestionIndex].img} alt="Img"/>
                                                        )

                                                    }
                                                    <h3 className="createQuiz__questionTitle">
                                                        {currentQuestionIndex + 1}. {questions[currentQuestionIndex].title}
                                                    </h3>
                                                </div>

                                                <div className={`createQuiz__question__answers question-type-${questions[currentQuestionIndex].type}`}>
                                                    {
                                                        questions[currentQuestionIndex].answers.map((answer, answerIndex)=>(
                                                            <label className="label label_answerCheckBox" key={answerIndex}>
                                                                <div
                                                                    className={`answerCheckBox_outer ${(answer.IsCorrect) ? 'correct' : ''}`}
                                                                >
                                                                    {
                                                                        (answer.img !== '' && answer.img !== null) &&
                                                                        (
                                                                            <img className="answerCheckBox__img" src={answer.img} alt="Img"/>
                                                                        )
                                                                    }
                                                                    <input
                                                                        name="answerCheckBox"
                                                                        type={(questions[currentQuestionIndex].type === "single") ? 'radio' : 'checkbox'}
                                                                        className="answerCheckBox"
                                                                        data-question-index={currentQuestionIndex}
                                                                        data-answer-index={answerIndex}
                                                                        data-wrapper={`viewQuestion-${currentQuestionIndex}`}
                                                                        onChange={(e)=>{checkUncheck(e)}}
                                                                    />
                                                                    {answer.title}
                                                                </div>
                                                            </label>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                            {
                                (quizViewAll)
                                    ?
                                    (
                                        <>
                                            <button className="button button_singleView_next button-blue" onClick={handleFinishTest}>Submit</button>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <button className="button button_singleView_next button-blue" onClick={handleNextQuestion}>{(allAnswered ? "Submit" : "Next")}</button>
                                        </>
                                    )
                            }

                        </div>
                    )
                    :
                    (
                        <div className="scoreBoard">
                            <h1 className="scoreBoard__title">Out of {totalPoints} Your score is.</h1>
                            <h1 className="scoreBoard__score">{score}</h1>
                            <a href="/" className='scoreBoard__home_link'>Go to home page</a>
                        </div>
                    )
            }
        </>
    )
}
export default ViewQuiz;