import React, { Component } from 'react';

import FormGenerator from './FormGenerator/FormGenerator';

// import classes from './Project.css'

class ObjectivePerformance extends Component {
    render () {
        const { title } = this.props.editNode || null;
        const metaData = (
            <div>
                <p>Objective: { title ? title : 'No Objective For this Node' }</p>
            </div>
        )
        return (
            <div>
                { metaData }
                <FormGenerator/>
            </div>
        );
    }
}

export default ObjectivePerformance;