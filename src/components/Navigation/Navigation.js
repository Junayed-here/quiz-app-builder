import React from "react";
import UserContext from '../../context/UserContext';
import "./Navigation.css"

function Nav(props) {
    const user = React.useContext(UserContext);

    return (
        <nav className="nav_bar">
            <div className="container">
                <p className="Nav__userInfo">
                    Welcome! <strong>{user.name}</strong>
                </p>
                <div className="nav_menu">
                    <button className="button createQuiz__button button-blue" onClick={props.handleNewQuizConfigOpen}>Create quiz</button>
                    <button className="button createQuiz__button button-red" onClick={props.handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default Nav;