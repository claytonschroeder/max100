import React, { Component } from 'react';


import classes from './Objective.css'


class Objective extends Component {
    render () {
        console.log(this.props.hasChildren)
        let klass = '';
        if(!this.props.hasChildren){
            klass = classes.HasChildren
        }
        return (
            <p className={ klass }>{ this.props.children }</p>
        );
    }
}

export default Objective;