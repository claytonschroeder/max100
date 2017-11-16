import React from 'react';

import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = (props) => (
    <ul className={classes.NavItems}>
        <NavItem link="/" exact>Login</NavItem>
        <NavItem link="/dashboard">Dashboard</NavItem>
        <NavItem link="/project/1">Project</NavItem>
        <NavItem link="/counter">Counter</NavItem>
    </ul>
);

export default navItems;