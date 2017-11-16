import React from 'react';

import classes from './NavBar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';

const navbabr = ( props ) => (
    <header className={classes.NavBar}>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav>
            <NavItems/>
        </nav>
    </header>
);

export default navbabr;