import React, { Component } from 'react';

import Aux from '../../hoc/aux.js';
import Styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    closeSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false,
        });
    };

    openSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: true
        });
    };

    render() {
        return (
            <Aux>
                <Toolbar toShow={!this.state.showSideDrawer} openSideDrawerHandler={this.openSideDrawerHandler}/>
                <SideDrawer
                    show={this.state.showSideDrawer}
                    closeHandler={this.closeSideDrawerHandler}
                />
                <main className={Styles.Content}>{this.props.children}</main>
            </Aux>
        );
    }
}

export default Layout;
