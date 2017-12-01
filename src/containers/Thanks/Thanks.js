import React, { Component } from 'react';

import classes from './Thanks.css'


class Thanks extends Component {
    render () {
        return (
            <div className={ classes.Home }>
                <div className={ classes.Inner }>
                    <h2 className={ classes.Centered }>Thank You!</h2>
                </div>
            </div>
        );
    }
}

export default Thanks;