import './App.css';
import React, {useState, useEffect} from "react";
import {Route, useNavigate, Link, Routes} from 'react-router-dom';
import Registration from "../Registration/Registration";
import Home from "../Home/Home";
import CreateQuiz from "../CreateQuiz/CreateQuiz";
import AddQuestion from "../CreateQuiz/AddQuestion/AddQuestion";
import QuizConfig from "../CreateQuiz/QuizConfig/QuizConfig";
import ViewQuiz from "../ViewQuiz/ViewQuiz";
import update from "immutability-helper";


function App() {
    const   navigate = useNavigate();
    const [quiz, setQuiz] = useState({
        'quiz': {
            'id': 1,
            'title': "Front-end Basic",
            'view': "single",
        },
        'questions': [
            {
                'id': 1,
                'title': "What is HTML stands for?",
                'img': "https://source.unsplash.com/random/300×300",
                'points': "5",
                'type': 'single',
                'answers': [
                    {
                        'IsCorrect': false,
                        'img': "",
                        'title': "Hyper Tension",
                    },
                    {
                        'IsCorrect': false,
                        'img': "",
                        'title': "Hyper Text Machine Learning",
                    },
                    {
                        'IsCorrect': false,
                        'img': "",
                        'title': "Hyper Text",
                    },
                    {
                        'IsCorrect': true,
                        'img': "",
                        'title': "Hyper Text Markup Language",
                    }
                ],
            },
            {
                'id': 2,
                'title': "Mark client-side languages.",
                'img': "",
                'points': "5",
                'type': 'multiple',
                'answers': [
                    {
                        'IsCorrect': true,
                        'img': "",
                        'title': "HTML",
                    },
                    {
                        'IsCorrect': true,
                        'img': "https://source.unsplash.com/random/200×200",
                        'title': "CSS",
                    },
                    {
                        'IsCorrect': false,
                        'img': "",
                        'title': "Java",
                    },
                    {
                        'IsCorrect': false,
                        'img': "",
                        'title': "PHP",
                    }
                ],
            },
        ]
    });
    const [createQuiz,setCreateQuiz] = useState(false);
    const [newQuiz,setNewQuiz] = useState([]);
    const [isQuizConfigOpen, setIsQuizConfigOpen] = useState(false);
    const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
    const [quizConfigData, setQuizConfigData] = useState('');
    const [questionConfigData, setQuestionConfigData] = useState('');
    const [questionConfigIndex, setQuestionConfigIndex] = useState('');

    // useEffect(()=>{
    //     console.log(quiz)
    //     console.log(newQuiz)
    // },[quiz,newQuiz])

    function onPopupClose() {
        setIsQuizConfigOpen(false);
        setIsAddQuestionOpen(false);
    }
    function moveQuestion(dragIndex, hoverIndex){
        if (createQuiz){
            const draggedQuestion = newQuiz.questions[dragIndex];
            setNewQuiz(
                update(newQuiz, {'questions': {$splice: [[dragIndex, 1], [hoverIndex, 0, draggedQuestion]]}})
            );
        } else{
            const draggedQuestion = quiz.questions[dragIndex];
            setQuiz(
                update(quiz, {'questions': {$splice: [[dragIndex, 1], [hoverIndex, 0, draggedQuestion]]}})
            );
        }

    }

    function newQuizConfigOpen() {
        setCreateQuiz(true);
        setQuizConfigData('');
        setIsQuizConfigOpen(true);
    }
    function quizConfigOpen(data) {
        setQuizConfigData(data)
        setIsQuizConfigOpen(true);
    }
    function handleQuizConfigSubmit(data) {
        setQuiz(
            update(quiz, {'quiz': {$merge: data}})
        );
        onPopupClose();
    }
    function handleNewQuizConfigSubmit(data) {
        createQuiz
            ?
            setNewQuiz(
                update(newQuiz, {'quiz': {$set: {...data}}})
            )
            :
            setNewQuiz(
                update(newQuiz, {'quiz': {$merge: data}})
            )
        onPopupClose();
        navigate('/create');
    }

    function newAddQuestionOpen() {
        setQuestionConfigIndex('');
        setQuestionConfigData('');
        setIsAddQuestionOpen(true);
    }
    function addQuestionOpen(index) {
        setQuestionConfigIndex(index);
        // setCreateQuiz(false);
        setQuestionConfigData(quiz.questions[index])
        setIsAddQuestionOpen(true);
    }
    function handleAddQuestionSubmit(data) {
        setQuiz(
            update(quiz, {'questions': {[questionConfigIndex]: {$merge: data}}})
        );
        onPopupClose();
    }
    function handleNewAddQuestionSubmit(data) {
        console.log((newQuiz.questions));
        (newQuiz.questions !== undefined)
            ?
            setNewQuiz(
                update(newQuiz, {'questions': {$push: [{...data}]}})
            )
            :
            setNewQuiz(
                update(newQuiz, {'questions': {$set: [{...data}]}})
            )
        onPopupClose();
    }

    function handleSubmitQuiz(data) {
        console.log(data)
    }

    return (
        <>
            {/*<Registration/>*/}
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/create">create</Link>
                    </li>
                    <li>
                        <Link to="/view">View</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route exact path='/' element={
                    <Home
                        handleNewQuizConfigOpen={newQuizConfigOpen}
                    />
                }/>

                <Route exact path='/create' element={
                    <CreateQuiz
                        quiz={quiz}
                        newQuiz={newQuiz}
                        createQuiz={createQuiz}
                        handleEditQuizConfigOpen={quizConfigOpen}
                        handleAddQuestionOpen={addQuestionOpen}
                        handleNewQuestionOpen={newAddQuestionOpen}
                        handleSubmitQuiz={handleSubmitQuiz}
                        moveQuestion={moveQuestion}
                    />
                }/>

                <Route exact path='/view' element={
                    <ViewQuiz
                        quiz={quiz}
                    />
                }/>

            </Routes>

            {isQuizConfigOpen && <QuizConfig
                createQuiz={createQuiz}
                onClose={onPopupClose}
                quizConfig={quizConfigData}
                handleEditSubmit={handleQuizConfigSubmit}
                handleNewSubmit={handleNewQuizConfigSubmit}
                handlePopupClose={onPopupClose}
            />}
            {isAddQuestionOpen && <AddQuestion
                createQuiz={createQuiz}
                onClose={onPopupClose}
                questionConfig={questionConfigData}
                handleSubmit={handleAddQuestionSubmit}
                handleNewSubmit={handleNewAddQuestionSubmit}
                handlePopupClose={onPopupClose}
            />}
        </>
    );
}

export default App;

