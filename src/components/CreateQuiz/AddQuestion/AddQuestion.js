import './AddQuestion.css';
import Popup from "../../Popup/Popup";
import Input from "../../Form/Input/Input";
import Form from "../../Form/Form";
import CheckboxRadio from "../../Form/CheckboxRadio/CheckboxRadio";
import deleteIcon from "../../../images/delete.svg";
import {useEffect, useState} from "react";
import update from "immutability-helper";
import Select from "../../Form/Select/Select";

function randomGen() {
    return Math.floor(100000 + Math.random() * 900000);
}
function Answer(props) {
    const randomId = randomGen();
    const deleteAnswerHidden = props.deleteAnswerHidden;
    let {title,img,IsCorrect} = ''
    if (props.item !== undefined || props.item !== null || props.item !== ''){
        ({title,img,IsCorrect} = {...props.item})
    }
    return (
        <div id={`removeId-${randomId}`} className="questionAnswer box-border">
            <Input
                label="Answer:"
                customClass="answerText"
                type="text"
                name={`qs_${randomId}`}
                placeholder="type answer"
                id={`qs_${randomId}`}
                default={title}
                required={true}
            />
            <Input
                label="Answer related image (optional):"
                customClass="answerImg"
                id={`qs_${randomId}_img`}
                type="url"
                name={`qs_${randomId}_img`}
                placeholder="image url"
                default={img}
            />
            <div className="answerAction">
                <div className="mark_correct">
                    <CheckboxRadio
                        customClass="correctCheckbox"
                        name="correctAnswer"
                        type={(props.questionType === "single")? "radio" : "checkbox"}
                        id={`qs_${randomId}_C`}
                        defaultChecked={IsCorrect}
                        label="Mark as correct"
                    />
                </div>
                {
                    !deleteAnswerHidden &&
                    (
                        <button className="button button-withIcon button-delete button-red"
                                type="button"
                                onClick={()=>props.deleteAnswer(`removeId-${randomId}`)}
                        >
                            <img src={deleteIcon} alt="delete"/>
                        </button>
                    )
                }

            </div>
        </div>
    )
}

function AddQuestion(props) {
    const minAnswerLength = 2;
    const [answers, setAnswers] = useState([]);
    const [questionType, setQuestionType] = useState("single");
    const [initBlankAnswers, setInitBlankAnswers] = useState([]);
    const [deleteAnswerHidden, setDeleteAnswerHidden] = useState(true);
    let isCorrectChecked = false;
    let {title, img, points, type} = '';
    useEffect(()=>{
        checkMinAnswerLength();
    },[initBlankAnswers,answers])


    if (props.editQuestionIndex !== '' && props.questionConfig !== undefined){
        ({title, img, points, type} = {...props.questionConfig});
        useEffect(()=>{
            setAnswers(props.questionConfig.answers)
        }, []);
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        correctAnswerCheck();

        const answerDom = document.getElementsByClassName('questionAnswer');
        if(answerDom.length < minAnswerLength) {
            alert("Please add minimum 2 answers")
            return;
        }
        if(!isCorrectChecked) {
            alert("Please select correct answer")
            return;
        }

        let question = {};
        const questionTitle = document.getElementById("qst").value
        const questionImg = document.getElementById("qs_img").value
        const questionPoints = document.getElementById("qs_point").value
        const questionAnswers = document.getElementsByClassName("questionAnswer");
        const answerText = document.getElementsByClassName("answerText");
        const answerImg = document.getElementsByClassName("answerImg");
        const answerIsCorrect = document.getElementsByClassName("correctCheckbox");
        let newAnswers = [];

        for(let i=0; i<questionAnswers.length; i++){
            const aText = answerText[i].value;
            const aImg = answerImg[i].value;
            const aIsCorrect = answerIsCorrect[i].checked;

            let answer = {};
            answer.title = aText;
            answer.img = aImg;
            answer.IsCorrect = aIsCorrect;
            newAnswers.push(answer)
        }

        question.title = questionTitle;
        question.type = questionType;
        question.img = questionImg;
        question.points = questionPoints;
        question.answers = newAnswers;
        props.questionSubmit(question);
    }
    function deleteAnswer(id) {
        document.getElementById(id).remove();
        checkMinAnswerLength();
    }
    function checkMinAnswerLength() {
        const allCheckbox = document.getElementsByClassName('correctCheckbox');
        (allCheckbox.length > minAnswerLength )
            ? setDeleteAnswerHidden(false) : setDeleteAnswerHidden(true);
    }
    function correctAnswerCheck() {
        const allCheckbox = document.getElementsByClassName('correctCheckbox');
        for (let i=0; i<allCheckbox.length;i++){
            if (allCheckbox[i].checked){
                isCorrectChecked=true;
                return;
            }else{
                isCorrectChecked=false;
            }
        }
    }
    function addAnswer() {
        const blankAnswer = {
            'IsCorrect': false,
            'img': "",
            'title': "",
        }
        if(answers.length > 0){
            setAnswers(
                update(answers, {$push: [blankAnswer]})
            )
        }else{
            setInitBlankAnswers(
                update(initBlankAnswers, {$push: [blankAnswer]})
            )
        }
    }
    function questionTypeChange(type) {
        setQuestionType(type)
    }
    useEffect(()=>{
        const correctAnsDom = document.getElementsByClassName('correctCheckbox');
        if(correctAnsDom.length > 0){
            for (let i = 0; i < correctAnsDom.length; i++) {
                correctAnsDom[i].checked = false;
            }
        }
    }, [questionType])
    return (
        <Popup handlePopupClose={props.handlePopupClose}>
            <div className="createQuizQuestions">
                <h2 className="quizQuestions__title">Add Question</h2>
                <div className="createQuizQuestion">
                    <Form customClass="popup-form" handleSubmit={handleFormSubmit}>
                        <input type="hidden" id="createQuizQuestionId" value=""/>
                        <fieldset className="fieldset fieldset__quizQuestion">
                            <Input
                                label="Question title:"
                                className="input"
                                type="text"
                                name="qst"
                                placeholder="type question"
                                default={title}
                                id="qst"
                                required={true}
                            />
                            <Select
                                name="quizView"
                                id="quizView"
                                label="Quiz View"
                                required={true}
                                onChange={questionTypeChange}
                                defaultValue={questionType}
                            >
                                <option value="single">Single select</option>
                                <option value="multiple">Multiple select</option>
                            </Select>
                            <Input
                                label="Question related image (optional):"
                                className="input"
                                id="qs_img"
                                type="url"
                                name="quizName"
                                placeholder="image url"
                                default={img}
                            />
                            <Input
                                label="Points for correct answer:"
                                className="input"
                                id="qs_point"
                                type="number"
                                placeholder="points"
                                default={points}
                                required={true}
                            />
                        </fieldset>
                        <fieldset className="fieldset fieldset__questionAnswers" id="questionAnswers">
                            {
                                (answers !== undefined && answers.length > 0)
                                    ?
                                    answers.map((item, index)=>(
                                        (<Answer questionType={questionType} deleteAnswerHidden={deleteAnswerHidden} item={item} key={index} deleteAnswer={deleteAnswer}/>)
                                    ))
                                    :
                                    initBlankAnswers.map((item, index)=>(
                                        <Answer questionType={questionType} deleteAnswerHidden={deleteAnswerHidden} item={item} key={index} deleteAnswer={deleteAnswer}/>
                                    ))
                            }
                        </fieldset>
                        <fieldset className="fieldset fromActionBox" id="addQuestionAction">
                            <button className="button button-blue" type="button"
                                    onClick={addAnswer}>Add answer</button>
                            <button className="button button-green" type="submit">Done</button>
                            <button className="button button-red" type="reset" onClick={props.onClose}>Cancel</button>
                        </fieldset>
                    </Form>
                </div>
            </div>
        </Popup>
    );
}

export default AddQuestion;

