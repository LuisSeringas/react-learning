import * as actionTypes from './actionTypes';
import BurgerIngredientTypes from '../components/Burger/BurgerIngredient/BurgerIngredientTypes';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice:
        BurgerIngredientTypes.properties['topBread'].price +
        BurgerIngredientTypes.properties['bottomBread'].price,
};

const reducer = (state = initialState, action) => {
    let updatedState = null;

    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            updatedState = {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]:
                        state.ingredients[action.ingredientType] + 1,
                },
                totalPrice:
                    state.totalPrice +
                    BurgerIngredientTypes.properties[action.ingredientType]
                        .price,
            };
            break;
        case actionTypes.REMOVE_INGREDIENTS:
            updatedState = {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]:
                        state.ingredients[action.ingredientType] - 1,
                },
                totalPrice:
                    state.totalPrice -
                    BurgerIngredientTypes.properties[action.ingredientType]
                        .price,
            };
            break;
        default:
            updatedState = state;
    }
    return updatedState;
};

export default reducer;
