import React, { Component } from 'react';

import Aux from '../../hoc/aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import BurgerIngredientTypes from '../../components/Burger/BurgerIngredient/BurgerIngredientTypes';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import db from '../../DB-API';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        onPurchaseLoading: false,
    };

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

    purchaseConfirmationHandler = () => {
        this.setState({
            onPurchaseLoading: true,
        });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Seringas',
                address: {
                    street: 'test Street',
                    zipCode: '6000-200',
                    country: 'Portugal',
                },
                email: 'test@test.com',
            },
            orderNumber: '2342342-random',
        };

        db.post('/orders.json', order)
            .then((response) => {
                console.log(response);

                this.setState({
                    onPurchaseLoading: false,
                    onPurchase: false,
                });
            })
            .catch((error) => {
                console.log(error);

                this.setState({
                    onPurchaseLoading: false,
                    onPurchase: false,
                });
            });
    };

    render() {
        const disableInfo = {
            ...this.state.ingredients,
        };

        let orderSummary = (
            <OrderSummary
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                confirmationHandler={this.purchaseConfirmationHandler}
                cancelHandler={this.cancelPurchaseHandler}
            />
        );

        if (this.state.onPurchaseLoading) {
            orderSummary = <Spinner />;
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        console.log(orderSummary);
        return (
            <Aux>
                <Modal
                    isOnPurchase={this.state.onPurchase}
                    closeModalHandler={this.cancelPurchaseHandler}
                >
                    {orderSummary}
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
