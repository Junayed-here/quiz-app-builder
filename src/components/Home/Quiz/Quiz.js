import './Quiz.css';
import editIcon from "../../../images/edit.svg";
import React from "react";
import {useNavigate} from "react-router-dom";

function Quiz(props) {
    const   navigate = useNavigate();
    function edit() {
        const quizId = props.quiz.quiz.id;
        props.quizEdit(quizId);
        navigate(`/edit/${quizId}`);
    }
    return (
        <div className="quiz">
            <button onClick={edit} className="button button-withIcon button-green quizEditButton" title="edit quiz">
                <img src={editIcon} alt="edit"/>
            </button>
            <div className="quiz__details">
                <h3 className="quiz__name">{props.quiz.quiz.title}</h3>
                <div className="quiz__info">
                    <p className="quiz__info-text">{props.quiz.questions.length} question</p>
                </div>

                <a href={`/view/${props.quiz.quiz.id}`} className="button quiz__getStarted_button button-blue">Get Started</a>
            </div>
        </div>
    );
}

export default Quiz;

