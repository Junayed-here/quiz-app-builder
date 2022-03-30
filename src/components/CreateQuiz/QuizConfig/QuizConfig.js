import './QuizConfig.css';
import Popup from "../../Popup/Popup";
import Input from "../../Form/Input/Input";
import Form from "../../Form/Form";
import Select from "../../Form/Select/Select";


function randomGen() {
    return Math.floor(100000 + Math.random() * 900000);
}

function QuizConfig(props) {
    const newQuiz = props.newQuiz;
    let quiz = {};
    let quizTitle = '';
    let quizView = 'single';
    let quizId = '';
    let createQuiz = props.createQuiz;
    // let quizId = '';
    // if (props.quizConfig !== '' || props.quizConfig !== undefined || !createQuiz){
    //     quizTitle = props.quizConfig.title;
    //     quizView = props.quizConfig.view;
    //     quizId = props.quizConfig.id;
    // }
    // console.log(newQuiz,newQuiz.length,newQuiz.quiz);

    if(newQuiz.quiz){
        quizTitle = newQuiz.quiz.title
        quizView = newQuiz.quiz.view
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        quiz.title = document.getElementById("quizName").value;
        quiz.view = document.getElementById("quizView").value;
        if (createQuiz && newQuiz.quiz === undefined){
            quiz.id = randomGen();
        }else{
            quiz.id = newQuiz.quiz.id;
        }

        if(newQuiz.quiz){
            props.editConfigSubmit(quiz);
        }else{
            props.createConfigSubmit(quiz);
        }

        // console.log(quizId);
        // else{
        //     console.log(quiz);
        //     props.handleNewSubmit(quiz);
        // }
    }

    return (
        <Popup handlePopupClose={props.handlePopupClose}>
            <div className="quizConfig_box">
                <h2 className="quizConfig_box__title">Quiz Configuration</h2>
                <div className="quizConfig">
                    <Form customClass="popup-form" handleSubmit={handleFormSubmit}>
                        <fieldset className="fieldset fieldset__quizConfig">
                            <Input
                                label="Quiz Name"
                                type="text"
                                name="quizName"
                                placeholder="Quiz Name"
                                id="quizName"
                                required={true}
                                default={quizTitle}
                                customClass=""
                                maxLength={20}
                                minLength={2}
                            />
                            <Select
                                name="quizView"
                                id="quizView"
                                label="Quiz View"
                                required={true}
                                defaultValue={quizView}
                            >
                                <option value="single">One question at a time</option>
                                <option value="all">All question together</option>
                            </Select>
                        </fieldset>
                        <fieldset className="fieldset fromActionBox">
                            <button className="button" type="submit">Done</button>
                            <button className="button" type="reset" onClick={props.onClose}>Cancel</button>
                        </fieldset>
                    </Form>
                </div>
            </div>
        </Popup>
    );
}

export default QuizConfig;

