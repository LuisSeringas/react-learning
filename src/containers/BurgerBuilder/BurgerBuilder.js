import React, { Component } from 'react';

import Aux from '../../hoc/aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import BurgerIngredientTypes from '../../components/Burger/BurgerIngredient/BurgerIngredientTypes';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        onPurchase: false,
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

    purchaseHandler = () => {
        this.setState({ onPurchase: true });
    };

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

    cancelPurchaseHandler = () => {
        this.setState({ onPurchase: false });
    };

    confirmationHandler = () => {
        alert('Your number is xxx, Waiting for your turn');
    }
    render() {
        const disableInfo = {
            ...this.state.ingredients,
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal
                    isOnPurchase={this.state.onPurchase}
                    closeModalHandler={this.cancelPurchaseHandler}
                >
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}
                    confirmationHandler={this.confirmationHandler}
                    cancelHandler={this.cancelPurchaseHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    totalPrice={this.state.totalPrice}
                    addIngredientHandler={this.addIngredientHandler}
                    removeIngredientHandler={this.removeIngredientHandler}
                    disableControls={disableInfo}
                    isPurchasable={this.state.purchasable}
                    purchaseHandler={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
