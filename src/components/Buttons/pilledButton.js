import 'bootstrap/dist/css/bootstrap.min.css';
import './pilledButton.css';

function PilledButton({ buttonText, textColor, backgroundColor }) {
    let btnClass = "btn rounded-pill " + backgroundColor;
    console.log(buttonText)
    return (
        <button className={btnClass}>
            <span className={textColor}>{buttonText}</span>
        </button>
    )
}

export default PilledButton;