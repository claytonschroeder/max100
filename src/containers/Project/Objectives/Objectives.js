import React, { Component } from 'react';
import { connect } from 'react-redux';
import SortableTree, { addNodeUnderParent, removeNodeAtPath, changeNodeAtPath, toggleExpandedForAll } from 'react-sortable-tree';

import * as actionCreators from '../../../store/actions/index';

import ObjectivePerformance from './ObjectivesPerformace/ObjectivePerformance';

import classes from './Objectives.css';

import { newNode } from './ObjectiveHelpers/NewNode';

class Objectives extends Component {
    expand = (expanded) => {
        this.props.onTreeUpdate({
            treeData: toggleExpandedForAll({
                treeData: this.props.tree,
                expanded,
            }),
        });
    }
    
    expandAll =() => {
        this.expand(true);
    }
    
    collapseAll = () => {
        this.expand(false);
    }

    render () {
        const getNodeKey = ({ treeIndex }) => treeIndex;
        const isActive = (nodeId) => {
            const editNodeId = this.props.editNode && this.props.editNode.id ? this.props.editNode.id : null;
            if(editNodeId === nodeId){
                return { boxShadow: '0px 0px 5px 3px green'}
            } else {
                return null
            }
        }
        const objPerformance = this.props.editNode ? (
            <ObjectivePerformance editNode={ this.props.editNode }/>
        ) : null;
        return (
            <div className={ classes.Container }>
                <div className={ classes.Objectives }>
                    <div className={ classes.ObjectivesButtons }>
                        <button 
                            onClick={() => {
                                const newTopLevel = newNode();
                                this.props.onTreeUpdate({treeData: this.props.tree.concat(newTopLevel)});
                            }}
                        >
                            Add Top Level Objective
                        </button>
                        <button onClick={ this.expandAll }>Expand All</button>
                        <button onClick={ this.collapseAll }>Collapse All</button>
                    </div>
                    <SortableTree
                        style={ {height: '90%'} }
                        treeData={this.props.tree}
                        onChange={treeData => this.props.onTreeUpdate({ treeData })}
                        generateNodeProps={({ node, path }) => ({
                            style: (isActive(node.id)),
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
                                        this.props.onChangeEditNode(
                                            {
                                                editNode: {...node, title},
                                                path,
                                                getNodeKey
                                            }
                                        );
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
                                        this.props.onChangeEditNode({
                                            editNode: newChildNode,
                                            path,
                                            getNodeKey
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
                                        this.props.onChangeEditNode({
                                            editNode: null,
                                            path,
                                            getNodeKey
                                        });
                                    }}
                                >
                                    Remove
                                </button>,
                                <button
                                    disabled={ node.children && node.children.length > 0 ? true : false }
                                    onClick={() => {
                                        this.props.onChangeEditNode({
                                            editNode: node,
                                            path,
                                            getNodeKey
                                        });
                                    }}
                                >
                                    Edit Info
                                </button>,
                            ],
                        })}
                    />
                </div>
                <div className={ classes.ObjectivesTools }>
                    { objPerformance }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tree: state.proj.treeData,
        editNode: state.proj.editNode
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTreeUpdate: (treeData) => dispatch(actionCreators.updateTree(treeData)),
        onChangeEditNode: (editNode) => dispatch(actionCreators.changeEditNode(editNode))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Objectives);