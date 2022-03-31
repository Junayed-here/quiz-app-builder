import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import dragIcon from "../../../images/drag.svg";
import editIcon from "../../../images/edit.svg";
import deleteIcon from "../../../images/delete.svg";

const type = { BOX: "box" };

const Question = ({ question, index, questionIndex, moveQuestion, handleEditQuestion, deleteQuestion }) => {
    const dragRef = useRef(null);
    const previewRef = useRef(null);

    function onEditQuestion() {
        handleEditQuestion(questionIndex);
    }
    function onDeleteQuestion() {
        deleteQuestion(questionIndex);
    }

    const [, drop] = useDrop({
        accept: type.BOX,
        hover(item) {
            if (!previewRef.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveQuestion(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: type.BOX,
        item: { id: question.id, index },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    }));

    drag(dragRef);
    drop(preview(previewRef))

    return (
        <div className="createQuiz__question" ref={previewRef} style={{ opacity: isDragging ? .4 : 1 }} >
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
                    question.answers.map((answer, index)=>(
                        <div
                            key={index}
                            className={`createQuiz__question__answer ${(answer.IsCorrect) ? 'correct' : ''}`}
                        >
                            {
                                (answer.img !== '' && answer.img !== null) &&
                                (
                                    <img className="createQuiz__question__answer__img" src={answer.img} alt="Img"/>
                                )
                            }
                            <p className="createQuiz__question__answer__title">
                                {answer.title}
                            </p>
                        </div>
                    ))
                }
            </div>
            <div className="createQuiz__question__config">
                <p className="createQuiz__question__config__text">Points: {question.points}</p>
                <p className="createQuiz__question__config__text">Type: {question.type}</p>
            </div>
            <div className="createQuiz__question__actions">
                <button ref={dragRef} className="button button-withIcon button-blue" title="drag to Rearrange question">
                    <img src={dragIcon} alt="drag"/>
                </button>
                <button className="button button-withIcon button-green" title="edit question" onClick={onEditQuestion}>
                    <img src={editIcon} alt="edit"/>
                </button>
                <button className="button button-withIcon button-red" onClick={onDeleteQuestion} title="delete question">
                    <img src={deleteIcon} alt="delete"/>
                </button>
            </div>
        </div>
    );
};

const QuestionList = (props) => {
    const renderQuestion = (question, index) => {
        return question ? (
            <Question
                question={question}
                index={index}
                questionIndex={index}
                key={index}
                moveQuestion={props.moveQuestion}
                deleteQuestion={props.deleteQuestion}
                handleEditQuestion={props.handleEditQuestion}
            />
        ): null;
    }
    return props.questions.map(renderQuestion);
};

export default QuestionList;