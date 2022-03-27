import './Select.css';

function Select(props) {
    const customClass = props.customClass ? `${props.customClass}` : '';

    return (
        <>
            <label className="label" htmlFor={props.id}>{props.label}</label>
            <select
                name={props.name}
                id={props.id}
                className={`select select-${props.name} `+ customClass}
                placeholder={props.placeholder}
                required={props.required}
                onKeyUp={props.handleKeyUp}
                defaultValue={props.defaultValue}
            >
                {props.children}
            </select>
            <span className="error">{props.error}</span>
        </>
    );
}

export default Select;
