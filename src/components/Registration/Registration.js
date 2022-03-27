import './Registration.css';
import React, {useState} from "react";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";

function Registration() {
    const [login, setLogin] = useState(true);

    function clickLogin(e) {
        setLogin(true);
    }
    function clickSignup() {
        setLogin(false);
    }
    return (
        <div className="registration">
            <h1 className="heading registration__heading">Welcome</h1>
            <p className="subheading registration__subheading">Please register or login</p>
            <div className="registration__form_window">
                <div className="registration__option">
                    <button className={`button button-registration__option `+ (login ? 'active' : '')} onClick={clickLogin}>Login</button>
                    <button className={`button button-registration__option `+ (login ? '' : 'active')} onClick={clickSignup}>Register</button>
                </div>
                { login ? <Login /> : <Signup />}
            </div>
        </div>
    );
}

export default Registration;