import React from 'react';

import Styles from './Input.module.css';

const Input = (props) => {
    let inputElement = null;

    const inputClasses = [Styles.InputElement];

    if (props.shouldValidate && props.isInvalid) {
        inputClasses.push(Styles.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputElement = (
                <input
                    onChange={props.OnChange}
                    className={inputClasses.join(' ')}
                    value={props.value}
                    {...props.elementConfig}
                />
            );
            break;
        case 'textarea':
            inputElement = (
                <textarea
                    onChange={props.OnChange}
                    className={inputClasses.join(' ')}
                    value={props.value}
                    {...props.elementConfig}
                />
            );
            break;
        case 'select':
            inputElement = (
                <select
                    onChange={props.OnChange}
                    className={inputClasses.join(' ')}
                    value={props.value}
                >
                    {props.elementConfig.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                />
            );
    }
    console.log('LABEL', props.label);
    return (
        <div className={Styles.Input}>
            <label className={Styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;
