import React, { Component } from 'react';

import CheckoutSummary from '../../components/Burger/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: null,
    };

    componentDidMount() {
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (let [ingredient, value] of queryParams.entries()) {
            ingredients[ingredient] = value;
        }

        this.setState({
            ingredients: ingredients,
        });
    }
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };
    render() {
        const checkoutSummary = this.state.ingredients ? (
            <CheckoutSummary
                ingredients={this.state.ingredients}
                cancelCheckout={this.checkoutCancelHandler}
                continueCheckout={this.checkoutContinueHandler}
            />
        ) : null;

        console.log(checkoutSummary);

        return checkoutSummary;
    }
}

export default Checkout;
