import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/Order/OrderSummary/OrderSummary';
import dbAPI from '../../DB-API';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/errorHandler/errorHandler';
import * as actionTypes from '../../store/actionTypes';

class BurgerBuilder extends Component {
    state = {
        onPurchase: false,
        onPurchaseLoading: false,
        error: false,
    };

    componentDidMount() {
        console.log('[BurgerBuilder.js] ComponentDidMount');

        /*         dbAPI
            .get('/ingredients.json')
            .then((response) => {
                let totalPrice = this.state.totalPrice;

                for (let [ingredient, value] of Object.entries(response.data)) {
                    for (let i = 0; i < value; i++) {
                        totalPrice +=
                            BurgerIngredientTypes.properties[ingredient].price;
                    }
                }

                this.setState({
                    ingredients: response.data,
                    totalPrice: totalPrice,
                });

                this.updatePurchaseState(response.data);
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
            }); */
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

        return totalIngredients > 0;
    };

    cancelPurchaseHandler = () => {
        this.setState({ onPurchase: false });
    };

    purchaseConfirmationHandler = () => {
        const queryParams = [];

        for (let ingredient in this.props.ingredients) {
            queryParams.push(
                encodeURIComponent(ingredient) +
                    '=' +
                    encodeURIComponent(this.props.ingredients[ingredient])
            );
        }
        queryParams.push('price=' + this.state.totalPrice);

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&'),
        });
    };

    render() {
        const disableInfo = {
            ...this.props.ingredients,
        };

        let orderSummary = null;

        let burger = this.state.error ? (
            <p>Ingredients can't be loaded!!</p>
        ) : (
            <Spinner />
        );

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        totalPrice={this.props.totalPrice}
                        addIngredientHandler={this.props.onAddIngredient}
                        removeIngredientHandler={this.props.onRemoveIngredient}
                        disableControls={disableInfo}
                        isPurchasable={this.updatePurchaseState(
                            this.props.ingredients
                        )}
                        purchaseHandler={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    totalPrice={this.props.totalPrice}
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ingredient) =>
            dispatch({
                type: actionTypes.ADD_INGREDIENTS,
                ingredientType: ingredient,
            }),
        onRemoveIngredient: (ingredient) =>
            dispatch({
                type: actionTypes.REMOVE_INGREDIENTS,
                ingredientType: ingredient,
            }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(errorHandler(BurgerBuilder, dbAPI));
