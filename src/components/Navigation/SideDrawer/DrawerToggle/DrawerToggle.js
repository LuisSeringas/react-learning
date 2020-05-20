import React from 'react';

import Styles from './DrawerToggle.module.css';

const DrawerToggle = (props) => (
    <div className={Styles.DrawerToggle} onClick={props.toggleHandler}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggle;