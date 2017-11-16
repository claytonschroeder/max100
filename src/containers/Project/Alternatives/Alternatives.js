import React, { Component } from 'react';
import Alternative from './Alternative/Alternative';
import classes from '../Project.css'

class Alternatives extends Component {
    render () {
        const alts = this.props.alts ? this.props.alts.map(alt => {
            return <Alternative key={ alt } name={ alt }/>
        }) : null;
        return (
            <div className={ classes.Alternatives }>
                { alts }
            </div>
        );
    }
}

export default Alternatives;