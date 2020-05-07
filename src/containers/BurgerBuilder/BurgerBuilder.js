import React, { Component } from 'react';

import Aux from '../../hoc/aux';
import Burger from '../../components/Layout/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
    };
    render() {
        return (
            <Aux>
                <div>Burger</div>
                <Burger ingredients={this.state.ingredients} />
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;
