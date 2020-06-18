import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Burger/Order/CheckoutSummary/CheckoutSummary';
import ContactDetails from '../../components/ContactDetails/ContactDetails';

class Checkout extends Component {
    state = {
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
        const checkoutSummary = this.props.ingredients ? (
            <React.Fragment>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    cancelCheckout={this.checkoutCancelHandler}
                    continueCheckout={this.checkoutContinueHandler}
                />
                <Route
                    path={this.props.match.url + '/contact-data'}
                    component={ContactDetails}
                />
            </React.Fragment>
        ) : null;

        return checkoutSummary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
    };
};
export default connect(mapStateToProps)(Checkout);
