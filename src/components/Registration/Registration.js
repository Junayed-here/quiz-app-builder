import './Registration.css';
import React, {useState} from "react";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
function Registration(props) {
    const [loginTab, setLoginTab] = useState(true);
    function clickLogin(e) {
        setLoginTab(true);
    }
    function clickSignup() {
        setLoginTab(false);
    }
    return (
        <div className="registration">
            <h1 className="heading registration__heading">Welcome</h1>
            <p className="subheading registration__subheading">Please register or login</p>
            <div className="registration__form_window">
                <div className="registration__option">
                    <button className={`button button-registration__option  button-blue `+ (loginTab ? 'active' : '')} onClick={clickLogin}>Login</button>
                    <button className={`button button-registration__option button-blue `+ (loginTab ? '' : 'active')} onClick={clickSignup}>Register</button>
                </div>
                { loginTab ? <Login handleLogin={props.handleLogin}/> : <Signup handleSignUp={props.handleSignUp} openLogin={clickLogin}/>}
            </div>
        </div>
    );
}

export default Registration;