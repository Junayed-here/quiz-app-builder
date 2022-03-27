import './CheckboxRadio.css';

function CheckboxRadio(props) {
    const customClass = props.customClass ? `${props.customClass}` : '';
    const isChecked = props.defaultChecked ? "checked" : '';

    return (
        <>
            <label className={`label label-${props.type}`} htmlFor={props.id}>{props.label}</label>
            <input
                name={props.name}
                type={props.type}
                id={props.id}
                defaultChecked={isChecked}
                className={`${props.type} `+ customClass}
                onKeyUp={props.handleKeyUp}
                required={props.required}
            />
        </>
    );
}

export default CheckboxRadio;
