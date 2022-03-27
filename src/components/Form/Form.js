import './Form.css';

function Form(props) {
    const customClass = props.customClass ? `${props.customClass}` : '';
    return (
        <form action="#" className={`form `+ customClass} onSubmit={props.handleSubmit}>
            {props.children}

            <span className="formError formError-signup">Something went wrong!</span>
        </form>
    );
}

export default Form;
