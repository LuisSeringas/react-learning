import React from 'react';

import Styles from './BuildControl.module.css';

const BuildControl = (props) => (
    <div className={Styles.BuildControl}>
        <label>{props.label}</label>
        <button onClick={props.addIngredientHandler} className={Styles.More}>
            +
        </button>
        <button 
        onClick={props.removeIngredientHandler} 
        className={Styles.Less}
        disabled={props.disabled}>
            -
        </button>
    </div>
);

export default BuildControl;
