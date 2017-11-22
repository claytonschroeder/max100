import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Objectives from './Objectives/Objectives';
import Aux from '../../hoc/Aux/Aux';

class Project extends Component {
    render () {
        return (
            <Aux>
                <Route path="/project/max100" component={() => <Objectives config='max100'/>} />
                <Route path="/project/smarter" component={() => <Objectives config='smarter'/>} />
                <Route path="/project/swing-weighting" component={() => <Objectives config='swing-weighting'/>} />
            </Aux>
        );
    }
}

export default Project;