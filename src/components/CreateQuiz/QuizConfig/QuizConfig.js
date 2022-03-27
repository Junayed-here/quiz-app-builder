import './QuizConfig.css';
import Popup from "../../Popup/Popup";
import Input from "../../Form/Input/Input";
import Form from "../../Form/Form";
import Select from "../../Form/Select/Select";



function QuizConfig(props) {
    let quizTitle = '';
    let quizView = 'single';
    let createQuiz = props.createQuiz;

    if (props.quizConfig !== '' || props.quizConfig !== undefined || !createQuiz){
        quizTitle = props.quizConfig.title;
        quizView = props.quizConfig.view;
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        let quiz = new Object();
        quiz.title = document.getElementById("quizName").value;
        quiz.view = document.getElementById("quizView").value;
        if (!createQuiz){
            props.handleEditSubmit(quiz);
        }else{
            props.handleNewSubmit(quiz);
        }

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

