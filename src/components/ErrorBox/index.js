import React from 'react';
import './index.css'; // Import your CSS file containing error box styles

const ErrorBox = ({ errorMessage }) => {
    return (
        <div className={`error-box ${errorMessage ? 'show' : ''}`}>
            <p>{errorMessage}</p>
        </div>
    );
};

export default ErrorBox;
