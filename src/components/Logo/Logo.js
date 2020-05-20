import React from 'react';

import logoImg from '../../assets/logo.svg';
import Styles from './Logo.module.css';

const Logo = (props) => (
    <div className={Styles.Logo}>
        <img src={logoImg} alt={'LOGO'}></img>
    </div>
);

export default Logo;
