import React, { Component } from 'react';

import FormGenerator from './FormGenerator/FormGenerator';

// import classes from './Project.css'

class ObjectivePerformance extends Component {
    state = {

    }
    componentDidMount(){
        console.log('obj performance mounted')
    }

    render () {
        const { id, title } = this.props.editNode || null;
        const metaData = (
            <div>
                <p>ID: { id }</p>
                <p>Title: { title ? title : 'No Title For this Node' }</p>
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