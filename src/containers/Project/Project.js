import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import Objectives from './Objectives/Objectives';
import Alternatives from './Alternatives/Alternatives';

import classes from './Project.css'

class Project extends Component {
    render () {
        return (
            <div>
                <h1>Project: {this.props.match.params.id}</h1>
                <div className={ classes.Containter }>
                    <Objectives />
                    <Alternatives alts={['Alt1', 'Alt 2', 'Alt 3', 'Alt4']}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        obj: state.proj.objectives
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddRow: () => dispatch(actionCreators.newRow()),
        onRemoveRow: (id) => dispatch(actionCreators.removeRow(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);