import './App.css';
import React, {useState, useEffect} from "react";
import {Route, useNavigate, NavLink, Routes, Navigate} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Registration from "../Registration/Registration";
import Home from "../Home/Home";
import CreateQuiz from "../CreateQuiz/CreateQuiz";
import EditQuiz from "../CreateQuiz/EditQuiz";
import AddQuestion from "../CreateQuiz/AddQuestion/AddQuestion";
import QuizConfig from "../CreateQuiz/QuizConfig/QuizConfig";
import ViewQuiz from "../ViewQuiz/ViewQuiz";
import update from "immutability-helper";

// import UserContext from '../../context/UserContext'
// const user = React.useContext(UserContext);
// console.log(user)

function App() {
    const   navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('quizAppBuilderLoggedInUser')));
    const [quizzes, setQuizzes] = useState(JSON.parse(localStorage.getItem('quizAppBuilderQuizzes')));
    const [loggedIn, setLoggedIn] = useState(!!JSON.parse(localStorage.getItem('quizAppBuilderLoggedInUser')));

    const [createQuiz,setCreateQuiz] = useState(false);
    const [editQuiz,setEditQuiz] = useState(false);
    const [newQuiz,setNewQuiz] = useState([]);
    const [isQuizConfigOpen, setIsQuizConfigOpen] = useState(false);
    const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
    const [questionConfigData, setQuestionConfigData] = useState('');
    const [editQuestionIndex, setEditQuestionIndex] = useState('');

    const [quiz, setQuiz] = useState({
        "quiz": {
            "id": 1,
            "title": "Front-end Basic",
            "view": "all"
        },
        "questions": [
            {
                "id": 1,
                "title": "What is HTML stands for?",
                "img": "https://source.unsplash.com/random/300×300",
                "points": "5",
                "type": "single",
                "answers": [
                    {
                        "IsCorrect": false,
                        "img": "",
                        "title": "Hyper Tension"
                    },
                    {
                        "IsCorrect": false,
                        "img": "",
                        "title": "Hyper Text Machine Learning"
                    },
                    {
                        "IsCorrect": false,
                        "img": "",
                        "title": "Hyper Text"
                    },
                    {
                        "IsCorrect": true,
                        "img": "",
                        "title": "Hyper Text Markup Language"
                    }
                ]
            },
            {
                "id": 2,
                "title": "Mark client-side languages.",
                "img": "",
                "points": "5",
                "type": "multiple",
                "answers": [
                    {
                        "IsCorrect": true,
                        "img": "",
                        "title": "HTML"
                    },
                    {
                        "IsCorrect": true,
                        "img": "https://source.unsplash.com/random/200×200",
                        "title": "CSS"
                    },
                    {
                        "IsCorrect": false,
                        "img": "",
                        "title": "Java"
                    },
                    {
                        "IsCorrect": false,
                        "img": "",
                        "title": "PHP"
                    }
                ]
            },
            {
                "id": 3,
                "title": "Dhaka is capital of?",
                "img": "",
                "points": "5",
                "type": "single",
                "answers": [
                    {
                        "IsCorrect": true,
                        "img": "",
                        "title": "Bangladesh"
                    },
                    {
                        "IsCorrect": false,
                        "img": "",
                        "title": "Japan"
                    },
                    {
                        "IsCorrect": false,
                        "img": "",
                        "title": "Chili"
                    },
                    {
                        "IsCorrect": false,
                        "img": "",
                        "title": "Denmark"
                    }
                ]
            }
        ]
    });
    const [selectedQuizId,setSelectedQuizId] = useState('');
    const [quizConfigData, setQuizConfigData] = useState('');


    useEffect(()=>{
        localStorage.setItem('quizAppBuilderQuizzes', JSON.stringify(quizzes));
        console.log(quizzes)
    },[quizzes]);
    useEffect(()=>{
        console.log(newQuiz);
    },[newQuiz])
    function handleSignUp(data) {
        localStorage.setItem('quizAppBuilderUser', JSON.stringify(data));
    }
    function handleLogin(data) {
        const userDB = JSON.parse(localStorage.getItem('quizAppBuilderUser'));
        if (userDB.email === data.email && userDB.password === data.password){
            const {name,email} = userDB;
            localStorage.setItem('quizAppBuilderLoggedInUser', JSON.stringify({name,email}));
            setUser({name,email});
            setLoggedIn(true);
            navigate(`/`);
            console.log("Signup Successful");
        }else{
            alert("email or password didn't match!");
        }
    }

    function onPopupClose() {
        setIsQuizConfigOpen(false);
        setIsAddQuestionOpen(false);
    }
    function moveQuestion(dragIndex, hoverIndex){
        const draggedQuestion = newQuiz.questions[dragIndex];
        setNewQuiz(
            update(newQuiz, {'questions': {$splice: [[dragIndex, 1], [hoverIndex, 0, draggedQuestion]]}})
        );
        // if (createQuiz){
        //     const draggedQuestion = newQuiz.questions[dragIndex];
        //     setNewQuiz(
        //         update(newQuiz, {'questions': {$splice: [[dragIndex, 1], [hoverIndex, 0, draggedQuestion]]}})
        //     );
        // } else{
        //     const draggedQuestion = quiz.questions[dragIndex];
        //     setNewQuiz(
        //         update(newQuiz, {'questions': {$splice: [[dragIndex, 1], [hoverIndex, 0, draggedQuestion]]}})
        //     );
        // }

    }

    function newQuizConfigOpen() {
        setCreateQuiz(true);
        // setQuizConfigData('');
        setIsQuizConfigOpen(true);
    }
    function editQuizConfigOpen() {
        // setQuizConfigData('');
        setIsQuizConfigOpen(true);
    }
    function addQuestionOpen() {
        // setQuestionConfigData('');
        setIsAddQuestionOpen(true);
    }
    function editQuestionOpen(index){
        setEditQuestionIndex(index);
        setQuestionConfigData(newQuiz.questions[index]);
        setIsAddQuestionOpen(true);
    }

    function quizEdit(quizEditIndex){
        console.log(quizEditIndex)
        quizzes.map((item,index)=>{
            if (item.quiz.id === quizEditIndex){
                console.log("edit ", item);
                let selectedQuiz = item.quiz;
                let selectedQuizQuestion = item.questions;
                setNewQuiz(
                    update(newQuiz,
                        {'quiz': {$set: {...selectedQuiz}},
                            'questions': {$set: [...selectedQuizQuestion]}})
                )
            }
        })
    }

    function createConfigSubmit(data) {
        setNewQuiz(
            update(newQuiz, {'quiz': {$set: {...data}},'questions': {$set: ''}})
        )
        onPopupClose();
        navigate(`/create`);
    }
    function editConfigSubmit(data) {
        setNewQuiz(
            update(newQuiz, {'quiz': {$merge: data}})
        )
        onPopupClose();
    }
    function deleteQuestion(index) {
        console.log(index);
        // update(newQuiz, {'quiz': {$merge: data}})
        setNewQuiz(
            update(newQuiz, {'questions': { $splice: [[index, 1]] } })
        )
    }
    function deleteQuiz(deleteIndex) {
        // console.log(deleteIndex);
        quizzes.map((item,index)=>{
            console.log(deleteIndex,index);
            if (item.quiz.id === deleteIndex){
                setQuizzes(
                    update(quizzes, { $splice: [[index, 1]] })
                );
            }
        });
        navigate(`/`);
    }
    function questionSubmit(data) {
        console.log(data);
        if (editQuestionIndex !== ''){
            setNewQuiz(
                update(newQuiz, {'questions': {[editQuestionIndex]: {$merge: data}}})
            )
        }
        if (newQuiz.questions.length === 0 && editQuestionIndex === ''){
            setNewQuiz(
                update(newQuiz, {'questions': {$set: [{...data}]}})
            )
        }else{
            setNewQuiz(
                update(newQuiz, {'questions': {$push: [{...data}]}})
            )
        }
        onPopupClose();
    }

    // function editQuestionSubmit(data) {
    //     console.log(data);
    //     setNewQuiz(
    //         update(newQuiz, {'questions': {[index]: {$merge: data}}})
    //     )
    //     onPopupClose();
    // }
    // function addQuestionOpen(index) {
    //     setQuestionConfigIndex(index);
    //     setCreateQuiz(false);
    //     setQuestionConfigData(quiz.questions[index])
    //     setIsAddQuestionOpen(true);
    // }
    // function quizConfigOpen(data) {
    //     setQuizConfigData(data)
    //     setIsQuizConfigOpen(true);
    // }
    //
    // function handleQuizConfigSubmit(data) {
    //     setQuiz(
    //         update(quiz, {'quiz': {$merge: data}})
    //     );
    //     onPopupClose();
    // }
    // function handleNewAddQuestionSubmit(data) {
    //     (newQuiz.questions !== undefined)
    //         ?
    //         setNewQuiz(
    //             update(newQuiz, {'questions': {$push: [{...data}]}})
    //         )
    //         :
    //         setNewQuiz(
    //             update(newQuiz, {'questions': {$set: [{...data}]}})
    //         )
    //     onPopupClose();
    // }
    //

    function handleQuizAddDb() {
        localStorage.setItem('quizAppBuilderQuizzes', JSON.stringify(quizzes));
    }
    function handleSubmitQuiz(data) {
        (quizzes.length > 0) ?
            quizzes.map((item,index)=>{
                if (item.quiz.id === data.quiz.id){
                    setQuizzes(
                        update(quizzes, {[index]: {$merge: data}})
                    );
                }else {
                    setQuizzes(
                        update(quizzes, {$push: [{...data}]})
                    )
                }
            })
            :
            setQuizzes(
                update(quizzes, {$set: [{...data}]})
            )
        console.log(data);
        console.log(quizzes);
        handleQuizAddDb();

    }


    {/*<nav>*/}
    {/*    <ul>*/}
    {/*        <li>*/}
    {/*            <NavLink to="/">Home</NavLink>*/}
    {/*        </li>*/}
    {/*        <li>*/}
    {/*            <NavLink to={`/create`}>create</NavLink>*/}
    {/*        </li>*/}
    {/*        <li>*/}
    {/*            <NavLink to="/view/1">View</NavLink>*/}
    {/*        </li>*/}
    {/*    </ul>*/}
    {/*</nav>*/}
    return (
        <UserContext.Provider value={user}>
            <>
                <Routes>

                    <Route element={<ProtectedRoute loggedIn={loggedIn}/>}>
                        <Route exact path='/' element={
                            <Home quizzes={quizzes}
                                quizEdit={quizEdit}
                                handleNewQuizConfigOpen={newQuizConfigOpen}
                            />
                        }/>
                        <Route exact path='/create' element={
                            <CreateQuiz
                                newQuiz={newQuiz}
                                createQuiz={createQuiz}
                                editQuizConfigOpen={editQuizConfigOpen}
                                addQuestionOpen={addQuestionOpen}
                                editQuestionOpen={editQuestionOpen}
                                handleSubmitQuiz={handleSubmitQuiz}
                                deleteQuestion={deleteQuestion}
                                moveQuestion={moveQuestion}
                            />
                        }/>
                        <Route exact path='/edit/:quizId' element={
                            <EditQuiz
                                quizEdit={quizEdit}
                                newQuiz={newQuiz}
                                createQuiz={createQuiz}
                                editQuizConfigOpen={editQuizConfigOpen}
                                addQuestionOpen={addQuestionOpen}
                                editQuestionOpen={editQuestionOpen}
                                handleSubmitQuiz={handleSubmitQuiz}
                                deleteQuestion={deleteQuestion}
                                deleteQuiz={deleteQuiz}
                                moveQuestion={moveQuestion}
                            />
                        }/>

                        <Route path="/view/:quizId" element={
                            <ViewQuiz quizzes={quizzes} quiz={quiz}/>
                        }/>
                    </Route>

                    <Route path='/register' element={
                        (!loggedIn) ?
                            <Registration handleLogin={handleLogin} handleSignUp={handleSignUp}/>
                            :
                            <Navigate to="/" replace />
                    } />
                    <Route path="*" element={<p>There's nothing here: 404!</p>} />
                </Routes>

                {isQuizConfigOpen && <QuizConfig
                    createQuiz={createQuiz}
                    editQuiz={editQuiz}
                    newQuiz={newQuiz}
                    onClose={onPopupClose}
                    createConfigSubmit={createConfigSubmit}
                    editConfigSubmit={editConfigSubmit}
                    handlePopupClose={onPopupClose}
                />}
                {isAddQuestionOpen && <AddQuestion
                    editQuiz={editQuiz}
                    createQuiz={createQuiz}
                    questionConfig={questionConfigData}
                    editQuestionIndex={editQuestionIndex}
                    onClose={onPopupClose}
                    questionSubmit={questionSubmit}
                    handlePopupClose={onPopupClose}
                    // editQuestionSubmit={editQuestionSubmit}
                    // handleNewSubmit={handleNewAddQuestionSubmit}
                    // handlePopupClose={onPopupClose}
                />}
            </>
        </UserContext.Provider>
    );
}

export default App;

