import React from 'react';
import Styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => {
    const styles = [Styles.Toolbar];

    if (!props.toShow) {
        styles.push(Styles.DisableToolbar);
    }

    return (
        <header className={styles.join(' ')}>
            <DrawerToggle toggleHandler={props.openSideDrawerHandler}/>
            <Logo />
            <nav className={Styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default Toolbar;
