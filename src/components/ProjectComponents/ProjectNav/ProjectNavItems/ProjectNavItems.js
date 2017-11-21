import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './ProjectNavItems.css';
import ProjectNavItem from './ProjectNavItem/ProjectNavItem';

const navItems = (props) => {
    return (
        <ul className={classes.ProjectNavItems}>
            <ProjectNavItem link={`${props.match.url}/define-objectives`}>Define Objectives</ProjectNavItem>
            <ProjectNavItem link={`${props.match.url}/define-alternatives`}>Define Alternatives</ProjectNavItem>
            <ProjectNavItem link={`${props.match.url}/results`}>View Results</ProjectNavItem>
        </ul>
    );
};

export default withRouter(navItems);