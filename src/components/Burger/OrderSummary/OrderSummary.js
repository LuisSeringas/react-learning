import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import WrapperWithCss from '../../../hoc/WrapperWithStyle/WrapperWithStyle';
import Style from './OrderSummary.module.css';

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map((igkey) => (
        <li key={igkey}>
            {props.ingredients[igkey]} x{' '}
            <span style={{ textTransform: 'capitalize' }}>{igkey}</span>
        </li>
    ));
    return (
        <Aux>
            <h3>Your Order</h3>
            <ul>{ingredientsSummary}</ul>
            <p>
                <strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
            </p>
            <p>Your Hamburger sounds delicious!</p>
            <div className={Style.Buttons}>
                <Button btnType={'Success'} onClick={props.confirmationHandler}>
                    CONFIRM
                </Button>
                <Button btnType={'Unsuccess'} onClick={props.cancelHandler}>
                    CANCEL
                </Button>
            </div>
        </Aux>
    );
};

export default WrapperWithCss(OrderSummary, Style.OrderSummary);
