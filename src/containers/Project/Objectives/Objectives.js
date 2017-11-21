import React, { Component } from 'react';
import { connect } from 'react-redux';
import SortableTree, { addNodeUnderParent, removeNodeAtPath, changeNodeAtPath, toggleExpandedForAll } from 'react-sortable-tree';

import * as actionCreators from '../../../store/actions/index';

import ObjectivePerformance from './ObjectivesPerformace/ObjectivePerformance';

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

        const getClasses = (nodeId, hide) => {
            const classNames = [{classes: classes.Push}];
            const editNodeId = this.props.editNode && this.props.editNode.id ? this.props.editNode.id : null;
            if(editNodeId === nodeId){
                classNames.push({classes: classes.Active})
            }
            if(hide){
                classNames.push({classes: classes.Hidden})
            }
            return classNames.map(el => {
                return el.classes
            }).join(' ')
        };

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
                        innerStyle={{paddingLeft: '30px'}}
                        treeData={this.props.tree}
                        onChange={treeData => this.props.onTreeUpdate({ treeData })}
                        generateNodeProps={({ node, path }) => ({
                            className: (getClasses(node.id, node.hide)),
                            title: (
                                <input
                                    value={node.title}
                                    onFocus={() => this.props.onChangeEditNode({
                                        editNode: node,
                                        path,
                                        getNodeKey
                                    })}
                                    onClick={() => this.props.onChangeEditNode({
                                        editNode: node,
                                        path,
                                        getNodeKey
                                    })}
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
                                        this.props.onChangeEditNode({
                                            editNode: null,
                                            path,
                                            getNodeKey
                                        });
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
                                <button
                                    className={ classes.ShowHide }
                                    onClick={() => {
                                        this.props.onTreeUpdate({
                                            treeData: changeNodeAtPath({
                                                treeData: this.props.tree,
                                                path,
                                                getNodeKey,
                                                newNode: { 
                                                    ...node,
                                                    hide: !node.hide 
                                                },
                                            }),
                                        });
                                    }}
                                >
                                    { !node.hide ? "Hide" : "Show"}
                                </button>
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