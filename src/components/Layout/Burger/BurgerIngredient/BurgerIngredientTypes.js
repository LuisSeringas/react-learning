import Styles from './BurgerIngredient.module.css';
import React from 'react';

const topBread = (
    <div className={Styles.BreadTop}>
        <div className={Styles.Seeds1}></div>
        <div className={Styles.Seeds2}></div>
    </div>
);

const bottomBread = <div className={Styles.BreadBottom}></div>;

const meat = <div className={Styles.Meat}></div>;

const cheese = <div className={Styles.Cheese}></div>;

const bacon = <div className={Styles.Bacon}></div>;

const salad = <div className={Styles.Salad}></div>;

const BurgerIngredientTypes = {
    TOP_BREAD: 'topBread',
    BOTTOM_BREAD: 'bottomBread',
    MEAT: 'meat',
    CHEESE: 'cheese',
    BACON: 'bacon',
    SALAD: 'salad',
    properties: {
        topBread: {
            representation: topBread,
            price: 0.5,
        },
        bottomBread: {
            representation: bottomBread,
            price: 0.5,
        },
        meat: {
            representation: meat,
            price: 2.4,
        },
        cheese: {
            representation: cheese,
            price: 1.3,
        },
        bacon: {
            representation: bacon,
            price: 1.3,
        },
        salad: {
            representation: salad,
            price: 1.3,
        },
    },
};

export default Object.freeze(BurgerIngredientTypes);
