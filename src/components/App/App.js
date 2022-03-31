import './App.css';
import React, {useState, useEffect} from "react";
import {Route, useNavigate, Routes, Navigate} from 'react-router-dom';
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
import Nav from "../Navigation/Navigation";

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

    useEffect(()=>{
        localStorage.setItem('quizAppBuilderQuizzes', JSON.stringify(quizzes));
        // console.log(quizzes)
    },[quizzes]);
    // useEffect(()=>{
    //     console.log(newQuiz);
    // },[newQuiz])
    function handleSignUp(data) {
        localStorage.setItem('quizAppBuilderUser', JSON.stringify(data));
    }
    function handleLogin(data) {
        const userDB = JSON.parse(localStorage.getItem('quizAppBuilderUser'));
        if (userDB !== null && userDB !== undefined){
            if (userDB.email === data.email && userDB.password === data.password){
                const {name,email} = userDB;
                localStorage.setItem('quizAppBuilderLoggedInUser', JSON.stringify({name,email}));
                setUser({name,email});
                setLoggedIn(true);
                navigate(`/`);
                // console.log("Signup Successful");
            }else{
                alert("email or password didn't match!");
            }
        }else {
            alert("User don't exist!  Please register first");
        }

    }
    function handleLogout() {
        localStorage.removeItem('quizAppBuilderLoggedInUser');
        setLoggedIn(false);
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
    }

    function newQuizConfigOpen() {
        setCreateQuiz(true);
        setIsQuizConfigOpen(true);
    }
    function editQuizConfigOpen() {
        setIsQuizConfigOpen(true);
    }
    function addQuestionOpen() {
        setIsAddQuestionOpen(true);
    }
    function editQuestionOpen(index){
        setEditQuestionIndex(index);
        setQuestionConfigData(newQuiz.questions[index]);
        setIsAddQuestionOpen(true);
    }
    function quizEdit(quizEditIndex){
        // console.log(quizzes)
        quizzes.map((item,index)=>{
            // console.log(item.quiz.id , quizEditIndex,newQuiz)
            if (item.quiz.id === quizEditIndex){
                // console.log("edit ", item);
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
        // console.log(index);
        setNewQuiz(
            update(newQuiz, {'questions': { $splice: [[index, 1]] } })
        )
    }
    function deleteQuiz(deleteIndex) {
        quizzes.map((item,index)=>{
            if (item.quiz.id === deleteIndex){
                setQuizzes(
                    update(quizzes, { $splice: [[index, 1]] })
                );
            }
        });
        navigate(`/`);
        onPopupClose();
        setNewQuiz([]);
    }
    function questionSubmit(data) {
        // console.log(data,editQuestionIndex);
        if (editQuestionIndex !== ''){
            setNewQuiz(
                update(newQuiz, {'questions': {[editQuestionIndex]: {$merge: data}}})
            )
        }else{
            if (newQuiz.questions.length === 0 && editQuestionIndex === ''){
                setNewQuiz(
                    update(newQuiz, {'questions': {$set: [{...data}]}})
                )
            }else{
                setNewQuiz(
                    update(newQuiz, {'questions': {$push: [{...data}]}})
                )
            }
        }
        onPopupClose();
    }
    function handleQuizAddDb() {
        localStorage.setItem('quizAppBuilderQuizzes', JSON.stringify(quizzes));
    }
    function handleSubmitQuiz(data) {
        if(quizzes.length !== 0) {
            let quizMatch = false;
            let quizMatchId ;
            quizzes.map((item,index)=>{
                if (item.quiz.id === data.quiz.id){
                    quizMatch = true;
                    quizMatchId = index;
                }
            });
            // console.log(quizMatch,quizMatchId)
            if (quizMatch){
                setQuizzes(
                    update(quizzes, {[quizMatchId]: {$merge: data}})
                );
            }else {
                setQuizzes(
                    update(quizzes, {$push: [{...data}]})
                )
            }
        }else{
            setQuizzes(
                update(quizzes, {$set: [{...data}]})
            )
        }
        // console.log(data);
        // console.log( quizzes);
        handleQuizAddDb();
        onPopupClose();
        setNewQuiz([]);
        navigate('/');
    }



    return (
        <UserContext.Provider value={user}>
            <>
                <Routes>
                    <Route element={<ProtectedRoute loggedIn={loggedIn}/>}>
                        <Route exact path='/' element={
                            <>
                                <Nav handleNewQuizConfigOpen={newQuizConfigOpen} handleLogout={handleLogout}/>
                                <Home quizzes={quizzes}
                                      quizEdit={quizEdit}
                                />
                            </>
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
                            <ViewQuiz quizzes={quizzes}/>
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

