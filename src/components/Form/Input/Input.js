import './Input.css';

function Input(props) {
    const customClass = props.customClass ? `${props.customClass}` : '';

    return (
        <>
            <label className="label" htmlFor={props.id}>{props.label}</label>
            <input
                name={props.name}
                type={props.type}
                id={props.id}
                defaultValue={props.default}
                className={`input input-${props.name} `+ customClass}
                placeholder={props.placeholder}
                required={props.required}
                minLength={props.minLength}
                maxLength={props.maxLength}
                ref={props.ref}
            />
        </>
    );
}

export default Input;
