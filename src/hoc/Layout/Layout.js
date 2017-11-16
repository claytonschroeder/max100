import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import NavBar from '../../components/Navigation/NavBar/Navbar';

class Layout extends Component {
    render () {
        return (
            <Aux>
                <NavBar />
                <main className="Main">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;