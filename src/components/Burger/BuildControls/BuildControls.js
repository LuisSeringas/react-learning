import React from 'react';

import Style from './BuildControls.module.css';
import BurgerIngredientTypes from '../BurgerIngredient/BurgerIngredientTypes';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => {
    const controls = [
        { label: 'Salad', type: BurgerIngredientTypes.SALAD },
        { label: 'Meat', type: BurgerIngredientTypes.MEAT },
        { label: 'Cheese', type: BurgerIngredientTypes.CHEESE },
        { label: 'Bacon', type: BurgerIngredientTypes.BACON },
    ];

    const controlsList = controls.map((control, index) => (
        <BuildControl
            key={control.label + index}
            label={control.label}
            addIngredientHandler={() =>
                props.addIngredientHandler(control.type)
            }
            removeIngredientHandler={() =>
                props.removeIngredientHandler(control.type)
            }
            disabled={props.disableControls[control.type]}
        />
    ));

    return (
        <div className={Style.BuildControls}>
            <p>
                Total Price: <strong>${props.totalPrice.toFixed(2)}</strong>
            </p>
            {controlsList}
            <button
                className={Style.OrderButton}
                disabled={!props.isPurchasable}
                onClick={props.purchaseHandler}
            >
                Order Now
            </button>
        </div>
    );
};

export default BuildControls;
