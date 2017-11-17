import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './ProjectNavItem.css';

const navItem = ( props ) => (
    <li className={classes.ProjectNavItem}>
        <NavLink 
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default navItem;