import React, { Component } from 'react';

import classes from './Thanks.css'


class Thanks extends Component {
    render () {
        return (
            <div className={ classes.Home }>
                <div className={ classes.Inner }>
                    <h2 className={ classes.Centered }>Thank You!</h2>
                    <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    <p>Many desktop publishing packages sometimes on purpose (injected humour and the like).</p>
                </div>
            </div>
        );
    }
}

export default Thanks;