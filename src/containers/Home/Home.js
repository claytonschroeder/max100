import React, { Component } from 'react';

import * as actionCreators from '../../store/actions/index';
import { connect } from 'react-redux';

import classes from './Home.css'


class Home extends Component {
    state = {
        name: ''
    }

    validate = () => {
        if(this.state.name.length === 0){
            alert('Please enter your name before continuing')
        } else {
            console.log(this.state.name)
            this.props.onNameUpdate(this.state.name);
            this.props.history.push('/case/max100');
        }
    }
    render () {
        return (
            <div className={ classes.Home }>
                <div className={ classes.Inner }>
                    <h2 className={ classes.Centered }>Welcome</h2>
                    <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    <p>Many desktop publishing packages sometimes on purpose (injected humour and the like).</p>
                    <div className={ classes.Centered }>
                        <input className={ classes.Input } type="text" value={ this.state.name } placeholder="Enter Your Name" onChange={ (event) => this.setState({name: event.target.value}) }/>
                    </div>
                    <div className={ classes.Buffer }>
                        <button className={ classes.Button } disabled={ !this.state.name.length > 0 } onClick={ this.validate }>Get Started</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNameUpdate: (name) => dispatch(actionCreators.updateName(name))
    }
};

export default connect(null, mapDispatchToProps)(Home);