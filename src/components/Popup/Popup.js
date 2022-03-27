import './Popup.css';
import closeIcon from "../../images/close.svg";


function Popup(props) {
    return (
        <div className="popup">
            <button className="popup__close" onClick={props.handlePopupClose}>
                <img src={closeIcon} alt="close"/>
            </button>
            <div className="popup__body">
                {props.children}
            </div>
        </div>
    );
}

export default Popup;

