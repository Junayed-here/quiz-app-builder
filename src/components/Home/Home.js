import './Home.css';
import Quizzes from "./Quizzes/Quizzes"
function Home(props) {
    return (
        <div className="home">
            <div className="container">
                <div className="home__top_info">
                    <h1 className="home__title">Test your skills.</h1>
                    <h2 className="hope_subheading">Variety of quizzes for you. The choice is yours</h2>
                    <button className="button" onClick={props.handleNewQuizConfigOpen}>Create quiz</button>
                </div>
                <Quizzes quizzes={props.quizzes} quizEdit={props.quizEdit}/>
            </div>
        </div>
    );
}

export default Home;

