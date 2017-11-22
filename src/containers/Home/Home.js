import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classes from './Home.css'


class Home extends Component {
    render () {
        return (
            <div className={ classes.Home }>
                <div className={ classes.Inner }>
                    <h2>Welcome</h2>
                    <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    <p>Many desktop publishing packages sometimes on purpose (injected humour and the like).</p>
                    <div className={ classes.Buffer }>
                        <Link className={ classes.Button } to='/case/max100' >Get Started</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;