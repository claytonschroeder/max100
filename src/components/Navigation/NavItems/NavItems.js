import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';


// currently set to display none so users cant switch between methods

const navItems = (props) => {
    if(props.location.pathname === '/') {
        return null
    } else {
        return (
            <ul className={classes.NavItems}>
                <NavItem link="/case/max100">Max 100</NavItem>
                <NavItem link="/case/smarter">SMARTER</NavItem>
                <NavItem link="/case/swing-weighting">Swing Weighting</NavItem>
            </ul>
        )
    }
};

export default withRouter(navItems);