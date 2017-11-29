import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Objectives from './Objectives/Objectives';
import ObjectivesEditor from './Objectives/ObjectivesEditor';
import Aux from '../../hoc/Aux/Aux';

class Project extends Component {
    render () {
        return (
            <Aux>
                <Route path="/case/max100" exact component={() => <Objectives config='max100'/>} />
                <Route path="/case/smarter" exact component={() => <Objectives config='smarter'/>} />
                <Route path="/case/swing-weighting" exact component={() => <Objectives config='swing'/>} />
                <Route path="/editor/max100" exact component={() => <ObjectivesEditor config='max100'/>} />
                <Route path="/editor/smarter" exact component={() => <ObjectivesEditor config='smarter'/>} />
                <Route path="/editor/swing-weighting" exact component={() => <ObjectivesEditor config='swing'/>} />
            </Aux>
        );
    }
}

export default Project;