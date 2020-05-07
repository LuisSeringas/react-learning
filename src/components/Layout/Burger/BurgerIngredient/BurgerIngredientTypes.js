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
        },
        bottomBread: {
            representation: bottomBread,
        },
        meat: {
            representation: meat,
        },
        cheese: {
            representation: cheese,
        },
        bacon: {
            representation: bacon,
        },
        salad: {
            representation: salad,
        },
    },
};

export default Object.freeze(BurgerIngredientTypes);
