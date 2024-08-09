import React, { useState } from 'react';
import './Button.css';

const Button = ({ onClick, disabled, children }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={`Button ${isClicked ? 'clicked' : ''}`}
        >
            {children}
        </button>
    );
};

export default Button;