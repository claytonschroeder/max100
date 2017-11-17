import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Objectives from './Objectives/Objectives';
import Alternatives from './Alternatives/Alternatives';
import ProjectNav from '../../components/ProjectComponents/ProjectNav/ProjectNav';
import classes from './Project.css'

class Project extends Component {
    render () {
        return (
            <div className={ classes.Containter }>
                <ProjectNav />
                <div className={ classes.ObjContainter }>
                    <Route path="/project/:id/define-objectives" component={Objectives} />
                </div>

                <div className={ classes.AltContainter }>
                    <Route path="/project/:id/define-alternatives" component={Alternatives} />
                </div>
            </div>
        );
    }
}

export default Project;