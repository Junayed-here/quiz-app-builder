import dragIcon from "../../images/drag.svg";
import editIcon from "../../images/edit.svg";
import deleteIcon from "../../images/delete.svg";
import './ViewQuiz.css';
import React, {useState} from "react";
import CheckboxRadio from "../Form/CheckboxRadio/CheckboxRadio";
import update from "immutability-helper";
function randomGen() {
    return Math.floor(100000 + Math.random() * 900000);
}

function ViewQuiz(props) {
    const quiz = props.quiz.quiz;
    const questions = props.quiz.questions;
    const quizView = props.quiz.quiz.view;
    const quizViewAll = (quizView === "all");
    console.log(props.quiz.quiz.view);
    const randomId = randomGen();
    let score = 0;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    let notAnswered = true;
    let answersCollectionFromQuiz = [];
    let answersCollectionFromUser = [];
    function quizAnswersWithPoints() {
        questions.map((question) => {
            const points = question.points;
            const correctAnswers = [];
            question.answers.map((answer,index) => {
                if (answer.IsCorrect){
                    correctAnswers.push(index)
                }
            });
            answersCollectionFromQuiz.push({points,correctAnswers})
        });
    }
    quizAnswersWithPoints()
    function collectUserAnswers(questionIndex,answerIndex,method,questionWrapper) {
        const customDomSelect = document.getElementById(questionWrapper);
        if (method === "ADD"){
            let added = false;
            if(answersCollectionFromUser.length < 1){
                answersCollectionFromUser.push({questionIndex: questionIndex,answerIndex: [answerIndex]});
                added = true;
            }
            answersCollectionFromUser.map((item,index)=>{
                if(item.questionIndex === questionIndex && !added){
                    answersCollectionFromUser[index].answerIndex.push(answerIndex);
                    added = true;
                }
            });
            (!added) ? answersCollectionFromUser.push({questionIndex: questionIndex,answerIndex: [answerIndex]}) : '';
            (customDomSelect !== null)?customDomSelect.classList.remove('not-answered'):'';
        }else if (method === "REMOVE"){
            answersCollectionFromUser.map((item,index)=>{
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
    }
    function scoreDetermine() {
        answersCollectionFromUser.map((item)=>{
            const quizAnswer = answersCollectionFromQuiz[item.questionIndex].correctAnswers;
            const userAnswer = item.answerIndex;
            if (quizAnswer.length === userAnswer.length){
                const checkValues =  !quizAnswer.map((e, i) => e == userAnswer[i]).includes(false)
                if(checkValues){
                    score = score + parseInt(answersCollectionFromQuiz[item.questionIndex].points);
                }
            }
        })
    }
    function checkUncheck(e) {
        let method = '';
        let questionIndex = e.target.getAttribute('data-question-index');
        let answerIndex = e.target.getAttribute('data-answer-index');
        let questionWrapper = e.target.getAttribute('data-wrapper');
        e.target.checked ? method = "ADD" : method = "REMOVE";
        console.log(parseInt(questionIndex),parseInt(answerIndex),method,questionWrapper);
        collectUserAnswers(parseInt(questionIndex),parseInt(answerIndex),method,questionWrapper);
    }
    function checkUnmarkQuestion() {
        const notAnsweredDom = document.getElementsByClassName('not-answered');
        (notAnsweredDom.length === 0) ? notAnswered = false : notAnswered = true;
    }
    function handleFinishTest() {
        checkUnmarkQuestion()
        if (!notAnswered){
            score = 0;
            scoreDetermine()
            console.log(score);
        }else{
            alert('please answer all question');
        }
    }
    function handleNextQuestion() {
        let checkboxes = document.getElementsByClassName('answerCheckBox');
        scoreDetermine();
        console.log(answersCollectionFromQuiz, answersCollectionFromUser);
        console.log(score);
        // console.log(questions.length , currentQuestionIndex)
        if ((currentQuestionIndex + 1) < questions.length){
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        for (let i=0; i<checkboxes.length;i++){
            checkboxes[i].checked = false;
            console.log(checkboxes[i].checked)
        }

        // console.log(checkboxes.length)
    }

    return(
        <>
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
                                                        {question.title}
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
                                                                        type="checkbox"
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
                                <div className="viewQuestion__box not-answered" id={`viewQuestion viewQuestion-${currentQuestionIndex}`}>
                                    <div className="createQuiz__question_question">
                                        {
                                            (questions[currentQuestionIndex].img !== '' && questions[currentQuestionIndex].img !== null) &&
                                            (
                                                <img className="createQuiz__question_img" src={questions[currentQuestionIndex].img} alt="Img"/>
                                            )

                                        }
                                        <h3 className="createQuiz__questionTitle">
                                            {questions[currentQuestionIndex].title}
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
                                                            name={`question-${currentQuestionIndex}`}
                                                            type="checkbox"
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
                                <button className="button" onClick={handleFinishTest}>Submit</button>
                            </>
                        )
                        :
                        (
                            <>
                                {/*<button className="button button_singleView_submit" onClick={handleFinishTest}>Submit</button>*/}
                                <button className="button button_singleView_next" onClick={handleNextQuestion}>Next</button>
                            </>
                        )
                }

            </div>
        </>
    )
}
export default ViewQuiz;