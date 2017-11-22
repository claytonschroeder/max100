import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Objectives from './Objectives/Objectives';
import Aux from '../../hoc/Aux/Aux';

class Project extends Component {
    render () {
        return (
            <Aux>
                <Route path="/case/max100" exact component={() => <Objectives config='max100'/>} />
                <Route path="/case/smarter" exact component={() => <Objectives config='smarter'/>} />
                <Route path="/case/swing-weighting" exact component={() => <Objectives config='swing'/>} />
            </Aux>
        );
    }
}

export default Project;