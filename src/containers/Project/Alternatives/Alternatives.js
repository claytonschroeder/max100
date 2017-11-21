import React, { Component } from 'react';
import Alternative from './Alternative/Alternative';
import ObjectiveList from './ObjectiveList/ObjectiveList';

import classes from './Alternatives.css';

class Alternatives extends Component {
    render () {
        return (
            <div className={ classes.Container }>
                <ObjectiveList />
                <p>List Alternatives</p>
                <Alternative />
                <Alternative />
                <Alternative />
                <Alternative />
                <Alternative />
                <Alternative />
            </div>
        );
    }
}

export default Alternatives;