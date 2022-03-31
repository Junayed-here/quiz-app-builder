import './Select.css';

function Select(props) {
    const customClass = props.customClass ? `${props.customClass}` : '';
    function handleChange(e) {
        // console.log(props.onChange);
        (props.onChange)? props.onChange(e.target.value) : '';
    }
    return (
        <>
            <label className="label" htmlFor={props.id}>{props.label}</label>
            <select
                name={props.name}
                id={props.id}
                className={`select select-${props.name} `+ customClass}
                placeholder={props.placeholder}
                required={props.required}
                onChange={handleChange}
                defaultValue={props.defaultValue}
            >
                {props.children}
            </select>
            <span className="error">{props.error}</span>
        </>
    );
}

export default Select;
