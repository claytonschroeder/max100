import React, { Component } from 'react';
import { connect } from 'react-redux';
import Objective from './Objective/Objective';

import classes from './ObjectiveList.css';


class ObjectiveList extends Component {
    render () {
        // to flatten the array we map over it and look and add each element. If
        // an element has children, we call the same function on its children
        function flatten(array) {
            var result = [];
            array.forEach(function (a) {
                result.push(a);
                if (Array.isArray(a.children)) {
                    result = result.concat(flatten(a.children));
                }
            });
            return result;
        }
        // pass the entire tree object to the flatten function to get he nested arrays
        // turned into a flattened array.
        const flattened = flatten(this.props.tree)
        // map pver the flattened array and return an objective component if it isnt hidden.
        const objectives = flattened.map(obj => {
            if(!obj.hide){
                return (<Objective key={ obj.id } hasChildren={ obj.children && obj.children.length > 0 }>{ obj.title }</Objective>)
            } else {
                return null
            }
        })
        return (
            <div className={ classes.ObjectiveListContainer }>
                <p>Objectives</p>
                {objectives}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tree: state.proj.treeData
    }
};

export default connect(mapStateToProps)(ObjectiveList);