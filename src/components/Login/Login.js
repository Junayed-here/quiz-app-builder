import Form from "../Form/Form";
import Input from "../Form/Input/Input";

function Login() {
    return (
        <Form handleSubmit='code'>
            <fieldset className="fieldset">
                <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    id="email"
                    required={true}
                    customClass=""
                    maxLength={20}
                    minLength={2}
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

            <button className="button button__role-submit" type="submit">Submit</button>
        </Form>
    );
}

export default Login;
