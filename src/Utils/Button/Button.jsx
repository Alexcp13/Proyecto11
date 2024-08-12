import React from 'react';
import './Button.css';

const Button = ({ onClick, disabled, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="Button"
    >
        {children}
    </button>
);

export default Button;