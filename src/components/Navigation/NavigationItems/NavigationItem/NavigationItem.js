import React from 'react';
import { NavLink } from 'react-router-dom';

import Styles from './NavigationItem.module.css';

const NavigationItem = (props) => (
    <li className={Styles.NavigationItem}>
        <NavLink to={props.link} activeClassName={Styles.active} exact>
            {props.children}
        </NavLink>
    </li>
);

export default NavigationItem;
