import Form from "../../Form/Form";
import Input from "../../Form/Input/Input";

function Login(props) {
    function handleSubmit(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        props.handleLogin({email,password});
    }
    return (
        <Form handleSubmit={handleSubmit}  customClass="registration__form">
            <fieldset className="fieldset">
                <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    id="email"
                    required={true}
                    customClass=""
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    id="password"
                    required={true}
                    customClass=""
                    minLength={6}
                />
            </fieldset>

            <button className="button button__role-submit registrationFromButton button-blue" type="submit">Submit</button>
        </Form>
    );
}

export default Login;
