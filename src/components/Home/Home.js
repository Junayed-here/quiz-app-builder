import './Home.css';
import Quizzes from "./Quizzes/Quizzes"
function Home(props) {
    return (
        <div className="home">
            <div className="container">
                <div className="home__top_info">
                    <div className="home__top_text_box">
                        <h1 className="home__title">All Quizzes</h1>
                    </div>
                </div>
                {
                    (props.quizzes !== null && props.quizzes.length !== 0) ? (
                        <Quizzes quizzes={props.quizzes} quizEdit={props.quizEdit}/>
                    ) : (
                        <div className="noQuiz">
                            <p className="noQuiz__text">You haven't created any quiz yet.</p>
                        </div>

                    )
                }

            </div>
        </div>
    );
}

export default Home;

