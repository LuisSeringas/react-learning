import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

function App() {
    return (
        <section>
            <Router>
                <Layout>
                    <Switch>
                        <Route
                            path="/burger-builder"
                            component={BurgerBuilder}
                        />
                        <Route path="/checkout" component={Checkout} />
                        <Redirect from="/" to="burger-builder" />
                    </Switch>
                </Layout>
            </Router>
        </section>
    );
}

export default App;
