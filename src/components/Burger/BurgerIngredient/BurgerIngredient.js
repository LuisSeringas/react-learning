import PropTypes from 'prop-types';

import BurgerIngredientTypes from './BurgerIngredientTypes';

const BurgerIngredient = (props) => {
    let ingredient = null;

    for (const ingredientType in BurgerIngredientTypes) {
        if (props.type === BurgerIngredientTypes[ingredientType]) {
            ingredient = BurgerIngredientTypes.properties[props.type].representation;
        }
    }
    return ingredient;
};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;
