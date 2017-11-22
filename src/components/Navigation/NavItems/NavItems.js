import React from 'react';

import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = (props) => (
    <ul className={classes.NavItems}>
        <NavItem link="/case/max100">Max 100</NavItem>
        <NavItem link="/case/smarter">SMARTER</NavItem>
        <NavItem link="/case/swing-weighting">Swing Weighting</NavItem>
    </ul>
);

export default navItems;