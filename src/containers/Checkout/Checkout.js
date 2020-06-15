import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Burger/Order/CheckoutSummary/CheckoutSummary';
import ContactDetails from '../../components/ContactDetails/ContactDetails';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0,
    };

    componentDidMount() {
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        for (let [param, value] of queryParams.entries()) {
            if (param === 'price') {
                price = value;
                continue;
            }
            ingredients[param] = value;
        }

        this.setState({
            ingredients: ingredients,
            price: price,
        });
    }
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };
    render() {
        console.log(this.state);
        const checkoutSummary = this.state.ingredients ? (
            <React.Fragment>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancelCheckout={this.checkoutCancelHandler}
                    continueCheckout={this.checkoutContinueHandler}
                />
                <Route
                    path={this.props.match.url + '/contact-data'}
                    render={(props) => (
                        <ContactDetails
                            ingredients={this.state.ingredients}
                            price={this.state.price}
                            {...props}
                        />
                    )}
                />
            </React.Fragment>
        ) : null;

        console.log(checkoutSummary);

        return checkoutSummary;
    }
}

export default Checkout;
