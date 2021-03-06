import React from 'react';

import Style from './Button.module.css';

const Button = (props) => {
    return (
        <button
            className={[Style.Button, Style[props.btnType]].join(' ')}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default Button;
