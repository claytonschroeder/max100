import React from 'react';

import classes from './ProjectNav.css';
import ProjectNavItems from '../ProjectNav/ProjectNavItems/ProjectNavItems';

const navbabr = ( props ) => (
    <header className={classes.ProjectNavBar}>
        <nav>
            <ProjectNavItems/>
        </nav>
    </header>
);

export default navbabr;