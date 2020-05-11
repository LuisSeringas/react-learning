import React, { Component } from 'react';

import Aux from '../../hoc/aux';
import Burger from '../../components/Layout/Burger/Burger';
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls';
import BurgerIngredientTypes from '../../components/Layout/Burger/BurgerIngredient/BurgerIngredientTypes';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        console.log('[BurgerBuilder.js] Constructor');
    }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice:
            BurgerIngredientTypes.properties['topBread'].price +
            BurgerIngredientTypes.properties['bottomBread'].price,
        purchasable: false,
    };

    static getDerivedStateFromProps() {
        console.log('[BurgerBuilder.js] getDerivedStateFromProps');
        return null;
    }

    componentDidMount() {
        console.log('[BurguerBuilder.js] ComponentDidMount');
    }

    componentDidUpdate() {
        console.log('[BurguerBuilder.js] ComponentDidUpdate');
    }

    updatePurchaseState = (updatedIngredients) => {
        const totalIngredients = Object.keys(updatedIngredients).reduce(
            (sum, ingredient) => {
                sum = sum + updatedIngredients[ingredient];
                return sum;
            },
            0
        );

        this.setState({ purchasable: totalIngredients > 0 });
    };

    addIngredientHandler = (type) => {
        console.log(
            '-----------------------------------------------------------'
        );

        /*         this.setState((prevState, props) => {
            const updatedIngredients = {
                ...prevState.ingredients,
            };

            updatedIngredients[type] = prevState.ingredients[type] + 1;

            const totalPrice =
                prevState.totalPrice +
                BurgerIngredientTypes.properties[type].price;

            return { ingredients: updatedIngredients, totalPrice: totalPrice };
        });
 */
        const updatedIngredients = {
            ...this.state.ingredients,
        };

        updatedIngredients[type] = updatedIngredients[type] + 1;

        const totalPrice =
            this.state.totalPrice +
            BurgerIngredientTypes.properties[type].price;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: totalPrice,
        });

        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        
        const updatedIngredients = {
            ...this.state.ingredients,
        };

        if (updatedIngredients[type] <= 0) {
            return;
        }

        updatedIngredients[type] = this.state.ingredients[type] - 1;

        const totalPrice =
            this.state.totalPrice -
            BurgerIngredientTypes.properties[type].price;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: totalPrice,
        });

        this.updatePurchaseState(updatedIngredients);
    };

    render() {
        const disableInfo = {
            ...this.state.ingredients,
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    totalPrice={this.state.totalPrice}
                    addIngredientHandler={this.addIngredientHandler}
                    removeIngredientHandler={this.removeIngredientHandler}
                    disableControls={disableInfo}
                    isPurchasable={this.state.purchasable}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
