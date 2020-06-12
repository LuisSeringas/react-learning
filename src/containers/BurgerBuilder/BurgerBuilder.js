import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import BurgerIngredientTypes from '../../components/Burger/BurgerIngredient/BurgerIngredientTypes';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import dbAPI from '../../DB-API';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/errorHandler/errorHandler';
import { queryAllByAltText } from '@testing-library/react';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        console.log('[BurgerBuilder.js] Constructor');
    }

    state = {
        ingredients: null,
        totalPrice:
            BurgerIngredientTypes.properties['topBread'].price +
            BurgerIngredientTypes.properties['bottomBread'].price,
        purchasable: false,
        onPurchase: false,
        onPurchaseLoading: false,
        error: false,
    };

    componentDidMount() {
        console.log('[BurgerBuilder.js] ComponentDidMount');

        dbAPI
            .get('/ingredients.json')
            .then((response) => {
                this.setState({
                    ingredients: response.data,
                });
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
            });
    }

    componentDidUpdate() {
        console.log('[BurgerBuilder.js] ComponentDidUpdate');
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
        console.log(this.props);

        const queryParams = [];

        for (let ingredient in this.state.ingredients) {
            queryParams.push(
                encodeURIComponent(ingredient) +
                    '=' +
                    encodeURIComponent(this.state.ingredients[ingredient])
            );
        }

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&'),
        });
        /*         this.setState({
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

        dbAPI
            .post('/orders.json', order)
            .then((response) => {
                this.setState({
                    onPurchaseLoading: false,
                    onPurchase: false,
                });
            })
            .catch((error) => {
                this.setState({
                    onPurchaseLoading: false,
                    onPurchase: false,
                });
            }); */
    };

    render() {
        const disableInfo = {
            ...this.state.ingredients,
        };

        let orderSummary = null;

        let burger = this.state.error ? (
            <p>Ingredients can't be loaded!!</p>
        ) : (
            <Spinner />
        );

        if (this.state.ingredients) {
            burger = (
                <Aux>
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

            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}
                    confirmationHandler={this.purchaseConfirmationHandler}
                    cancelHandler={this.cancelPurchaseHandler}
                />
            );
        }

        if (this.state.onPurchaseLoading) {
            orderSummary = <Spinner />;
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal
                    isToShow={this.state.onPurchase}
                    closeModalHandler={this.cancelPurchaseHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default errorHandler(BurgerBuilder, dbAPI);
