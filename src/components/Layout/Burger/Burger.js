import React from 'react';

import Styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let list = Object.keys(props.ingredients).reduce(
        (ingredientsList, ingredient) => {
            const ingredientQuantity = props.ingredients[ingredient];

            for (let i = 0; i < ingredientQuantity; i++) {
                ingredientsList.push(
                    <BurgerIngredient key={ingredient + i} type={ingredient} />
                );
            }

            return ingredientsList;
        },
        []
    );

    if (list.length === 0) {
        list = (<h2>Your Burger does not have any ingredient</h2>)
    }

        return (
            <div className={Styles.Burger}>
                <BurgerIngredient type={'topBread'}></BurgerIngredient>
                {list}
                <BurgerIngredient type={'bottomBread'}></BurgerIngredient>
            </div>
        );
};

export default Burger;
