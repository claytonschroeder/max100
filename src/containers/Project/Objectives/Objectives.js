import React, { Component } from 'react';
import SortableTree, { addNodeUnderParent, removeNodeAtPath, changeNodeAtPath } from 'react-sortable-tree';
import * as actionCreators from '../../../store/actions/index';
import { connect } from 'react-redux';
import classes from './Objectives.css'

const uuidv1 = require('uuid/v1');

class Objectives extends Component {
    state = {
        nodeInfo: null,
        path: null
    }
    render () {
        console.log(this.state)
        const getNodeKey = ({ treeIndex }) => treeIndex;
        return (
            <div className={ classes.Container }>
                <div className={ classes.Objectives }>
                    <SortableTree
                        treeData={this.props.tree}
                        onChange={treeData => this.props.onTreeUpdate({ treeData })}
                        generateNodeProps={({ node, path }) => ({
                        title: (
                            <input
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
                                    const newChildId = uuidv1();
                                    this.props.onTreeUpdate({
                                    treeData: addNodeUnderParent({
                                        treeData: this.props.tree,
                                        parentKey: path[path.length - 1],
                                        expandParent: true,
                                        getNodeKey,
                                        newNode: {
                                            id: newChildId,
                                            dataConfig: {
                                                pm: null,
                                                units: null,
                                                direction: null,
                                                msic: null,
                                                type: null,
                                                uncertainty: null,
                                                labels: null,
                                                valueFunc: null
                                            }
                                        },
                                    }).treeData,
                                    })
                                }}
                            >
                            Add Child
                            </button>,
                            <button
                                onClick={() => {
                                    this.props.onTreeUpdate({
                                        treeData: removeNodeAtPath({
                                            treeData: this.props.tree,
                                            path,
                                            getNodeKey,
                                        }),
                                    })
                                }}
                            >
                            Remove
                            </button>,
                            <button
                                disabled={ node.children && node.children.length > 0 ? true : false }
                                onClick={event => {
                                    this.setState({
                                        nodeInfo: {...node},
                                        path: [...path],
                                    })
                                    // this.props.onTreeUpdate({
                                    // treeData: changeNodeAtPath({
                                    //     treeData: this.props.tree,
                                    //     path,
                                    //     getNodeKey,
                                    //     newNode: { ...node, title },
                                    // }),
                                    // });
                                }}
                                >
                            Add Info
                            </button>,
                        ],
                        })}
                    />
                </div>
                <div className={ classes.ObjectivesTools }>
                    <button 
                        onClick={() => {
                            const newObjId = uuidv1();
                            this.props.onTreeUpdate({treeData: this.props.tree.concat({
                                id: newObjId, 
                                dataConfig: {
                                    pm: null,
                                    units: null,
                                    direction: null,
                                    msic: null,
                                    type: null,
                                    uncertainty: null,
                                    labels: null,
                                    valueFunc: null
                                }
                            })
                        })
                    }}>
                        Add New Objective
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tree: state.proj.treeData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTreeUpdate: (treeData) => dispatch(actionCreators.updateTree(treeData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Objectives);