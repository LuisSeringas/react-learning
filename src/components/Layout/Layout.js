import React from 'react';

import Aux from '../../hoc/aux.js';
import Styles from './Layout.module.css';

const Layout = (props) => (
    <Aux>
        <div>Toolbar |SideDrawer |Backdrop</div>
        <main className={Styles.Content}>{props.children}</main>
    </Aux>
);

export default Layout;
