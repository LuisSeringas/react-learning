import React from 'react';

import Styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
    <ul className={Styles.NavigationItems}>
        <NavigationItem link={'/'} active>Burger Builder</NavigationItem>
        <NavigationItem link={'/'}>Home</NavigationItem>
    </ul>
);

export default NavigationItems;
