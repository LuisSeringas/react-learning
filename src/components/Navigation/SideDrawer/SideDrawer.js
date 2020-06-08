import React from 'react';

import Styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ResponsiveWrapper from '../../../hoc//ResponsiveWrapper/ResponsiveWrapper';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    let cssStyles = [Styles.SideDrawer, Styles.Close];

    if (props.show) {
        cssStyles = [Styles.SideDrawer, Styles.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.closeHandler} />
            <div className={cssStyles.join(' ')}>
                <ResponsiveWrapper className={Styles.Logo}>
                    <Logo />
                </ResponsiveWrapper>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default SideDrawer;
