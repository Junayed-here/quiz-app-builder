import './Quiz.css';

function Quiz() {
    return (
        <div className="quiz">
            <div className="quiz__image_box">
                <img className="quiz__image" src="https://source.unsplash.com/random" alt="image"/>
            </div>
            <div className="quiz__details">
                <h3 className="quiz__name">Front-end Basic</h3>
                <div className="quiz__info">
                    <p className="quiz__info-text">30 minutes</p>
                    <p className="quiz__info-text">30 question</p>
                    <p className="quiz__info-text">Basic</p>
                </div>

                <a href="#" className="button quiz__getStarted_button">Get Started</a>
            </div>
        </div>
    );
}

export default Quiz;

