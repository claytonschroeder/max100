import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SortableTree, { addNodeUnderParent, removeNodeAtPath, changeNodeAtPath, toggleExpandedForAll } from 'react-sortable-tree';

import * as actionCreators from '../../../store/actions/index';

import classes from './Objectives.css';

import { newNode } from './ObjectiveHelpers/ObjectiveHelpers';


class Objectives extends Component {
    expand = (expanded) => {
        this.props.onTreeUpdate({
            treeData: toggleExpandedForAll({
                treeData: this.props.tree,
                expanded,
            }),
        });
    }
    
    expandAll = () => {
        this.expand(true);
    }
    
    collapseAll = () => {
        this.expand(false);
    }

    render () {
        const getNodeKey = ({ treeIndex }) => treeIndex;

        const canDrop = ({ node, nextParent, prevPath, nextPath }) => {
            //if the node is classified as trapped. check its drag path.
            if(node.trapped){
                //node should remain at same level
                if(prevPath.length !== nextPath.length){
                    return false
                }
                //node should have the same parent when dragged
                if(prevPath[0] !== nextPath[0]){
                    return false
                }
            }
            // if node is a trap, keep it at its level, it can relocate within its level though
            if(node.trap){
                if(prevPath.length !== nextPath.length){
                    return false
                }
            }
            return true;
        };

        const getInputs = (node, path) => {
            switch(this.props.config){
                case 'max100':
                    return(
                        <div>
                            <label>Score:</label>
                            <input
                                type='number'
                                min={0}
                                max={100}
                                value={node.max100.score ? node.max100.score : ''}
                                onChange={event => {
                                    const score = event.target.value;
                                    this.props.onTreeUpdate({
                                        treeData: changeNodeAtPath({
                                            treeData: this.props.tree,
                                            path,
                                            getNodeKey,
                                            newNode: { 
                                                ...node,
                                                max100: {
                                                    score
                                                }
                                            },
                                        }),
                                    });
                                }}
                            />
                        </div>
                    )
                case 'smarter':
                    return(
                        <div>
                            <label>Min:</label>
                            <input
                                type='number'
                                min={0}
                                max={100}
                                value={node.smarter.min ? node.smarter.min : ''}
                                onChange={event => {
                                    const min = event.target.value;
                                    this.props.onTreeUpdate({
                                        treeData: changeNodeAtPath({
                                            treeData: this.props.tree,
                                            path,
                                            getNodeKey,
                                            newNode: { 
                                                ...node,
                                                smarter: {
                                                    ...node.smarter,
                                                    min
                                                }
                                            },
                                        }),
                                    });
                                }}
                            />
                            <label>Max:</label>
                            <input
                                type='number'
                                min={0}
                                max={100}
                                value={node.smarter.max ? node.smarter.max : ''}
                                onChange={event => {
                                    const max = event.target.value;
                                    this.props.onTreeUpdate({
                                        treeData: changeNodeAtPath({
                                            treeData: this.props.tree,
                                            path,
                                            getNodeKey,
                                            newNode: { 
                                                ...node,
                                                smarter: {
                                                    ...node.smarter,
                                                    max
                                                }
                                            },
                                        }),
                                    });
                                }}
                            />
                        </div>
                    )
                case 'swing-weighting':
                    return(
                        <div>
                            <label>Min:</label>
                            <input
                                type='number'
                                min={0}
                                max={100}
                                value={node.swing.min ? node.swing.min : ''}
                                onChange={event => {
                                    const min = event.target.value;
                                    this.props.onTreeUpdate({
                                        treeData: changeNodeAtPath({
                                            treeData: this.props.tree,
                                            path,
                                            getNodeKey,
                                            newNode: { 
                                                ...node,
                                                swing: {
                                                    ...node.swing,
                                                    min
                                                }
                                            },
                                        }),
                                    });
                                }}
                            />
                            <label>Max:</label>
                            <input
                                type='number'
                                min={0}
                                max={100}
                                value={node.swing.max ? node.swing.max : ''}
                                onChange={event => {
                                    const max = event.target.value;
                                    this.props.onTreeUpdate({
                                        treeData: changeNodeAtPath({
                                            treeData: this.props.tree,
                                            path,
                                            getNodeKey,
                                            newNode: { 
                                                ...node,
                                                swing: {
                                                    ...node.swing,
                                                    max
                                                }
                                            },
                                        }),
                                    });
                                }}
                            />
                            <label>Score:</label>
                            <input
                                type='number'
                                min={0}
                                max={100}
                                value={node.swing.score ? node.swing.score : ''}
                                onChange={event => {
                                    const score = event.target.value;
                                    this.props.onTreeUpdate({
                                        treeData: changeNodeAtPath({
                                            treeData: this.props.tree,
                                            path,
                                            getNodeKey,
                                            newNode: { 
                                                ...node,
                                                swing: {
                                                    ...node.swing,
                                                    score
                                                }
                                            },
                                        }),
                                    });
                                }}
                            />
                        </div>
                    )
                default: return null
            }
        }

        return (
            <div className={ classes.Container }>
                <div className={ classes.Objectives }>
                    <div className={ classes.ObjectivesButtons }>
                        <button 
                            disabled
                            onClick={() => {
                                const newTopLevel = newNode();
                                this.props.onTreeUpdate({treeData: this.props.tree.concat(newTopLevel)});
                            }}
                        >
                            Add Top Level Objective
                        </button>
                    </div>
                    <SortableTree
                        canDrop={ canDrop }
                        style={ {height: '90%'} }
                        innerStyle={{paddingLeft: '30px'}}
                        treeData={this.props.tree}
                        onChange={treeData => this.props.onTreeUpdate({ treeData })}
                        generateNodeProps={({ node, path }) => ({
                            title: (
                                    <input
                                        disabled
                                        value={node.title}
                                        onChange={event => {
                                            const title = event.target.value;
                                            this.props.onTreeUpdate({
                                                treeData: changeNodeAtPath({
                                                    treeData: this.props.tree,
                                                    path,
                                                    getNodeKey,
                                                    newNode: { 
                                                        ...node,
                                                        title 
                                                    },
                                                }),
                                            });
                                        }}
                                    />
                            ),
                            buttons: [
                                <button
                                    onClick={() => {
                                        const newChildNode = newNode();
                                        this.props.onTreeUpdate({
                                            treeData: addNodeUnderParent({
                                                treeData: this.props.tree,
                                                parentKey: path[path.length - 1],
                                                expandParent: true,
                                                getNodeKey,
                                                newNode: newChildNode,
                                            }).treeData,
                                        });
                                    }}
                                >
                                    Add Sub-Objective
                                </button>,
                                <button
                                    onClick={() => {
                                        this.props.onTreeUpdate({
                                            treeData: removeNodeAtPath({
                                                treeData: this.props.tree,
                                                path,
                                                getNodeKey,
                                            }),
                                        });
                                    }}
                                >
                                    Remove
                                </button>,
                                getInputs(node, path)
                            ],
                        })}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tree: state.treeData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTreeUpdate: (treeData) => dispatch(actionCreators.updateTree(treeData))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Objectives));