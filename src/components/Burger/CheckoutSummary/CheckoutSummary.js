import React from 'react';
import Styles from './CheckoutSummary.module.css';
import Burger from '../Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
    return (
        <div className={Styles.CheckoutSummary}>
            <h1>MNHUMMM SOUNDS DELICIOUS!</h1>
            <Burger ingredients={props.ingredients} />
            <Button btnType="Unsuccess">Cancel</Button>
            <Button btnType="Success">Continue</Button>
        </div>
    );
};

export default CheckoutSummary;
