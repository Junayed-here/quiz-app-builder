import Form from "../Form/Form";
import Input from "../Form/Input/Input";

function Signup() {
    return (
        <Form handleSubmit='code'>
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

export default Signup;
