import Form from "../../Form/Form";
import Input from "../../Form/Input/Input";

function Signup(props) {
    function handleSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const user = {name,email,password};
        props.handleSignUp(user);
        props.openLogin();
        console.log("Signup Successful");
        // localStorage.setItem('quizAppBuilder', JSON.stringify(user));

    }
    return (
        <Form handleSubmit={handleSubmit}>
            <fieldset className="fieldset">
                <Input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    id="name"
                    required={true}
                    customClass=""
                    maxLength={20}
                    minLength={2}
                />
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

            <button className="button button__role-submit registrationFromButton" type="submit">Submit</button>
        </Form>
    );
}

export default Signup;
