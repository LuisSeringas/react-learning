import React from 'react';
import Styles from './Order.module.css';

const Order = (props) => {
    console.log(props);

    const ingredients = [];

    for (let [ingredient, amount] of Object.entries(props.ingredients)) {
        ingredients.push(
            <span key={ingredient}>
                {ingredient}: {amount}
            </span>
        );
    }
    return (
        <div className={Styles.Order}>
            <p>Ingredients: {ingredients} </p>
            <p>
                Price:{' '}
                <strong>EUR {Number.parseFloat(props.price).toFixed(2)}</strong>
            </p>
        </div>
    );
};

export default Order;
