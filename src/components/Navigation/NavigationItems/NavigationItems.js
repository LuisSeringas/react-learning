import React from 'react';

import Styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
    <ul className={Styles.NavigationItems}>
        <NavigationItem link={'/'} exact={props.exact}>
            Burger Builder
        </NavigationItem>
        <NavigationItem link={'/orders'}>Orders</NavigationItem>
    </ul>
);

export default NavigationItems;
