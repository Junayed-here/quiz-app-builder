import './Quizzes.css';
import Quiz from "../Quiz/Quiz";

function Quizzes(props) {
    return (
        <div className="quizzes">
            {
                props.quizzes.map((item,index)=>(
                    <Quiz quiz={item} key={index} quizEdit={props.quizEdit}/>
                ))
            }
        </div>
    );
}

export default Quizzes;

