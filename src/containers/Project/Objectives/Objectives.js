import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SortableTree, { addNodeUnderParent, removeNodeAtPath, changeNodeAtPath, toggleExpandedForAll, getFlatDataFromTree } from 'react-sortable-tree';
import axios from '../../../axios';
import * as actionCreators from '../../../store/actions/index';

import classes from './Objectives.css';
import { newNode } from './ObjectiveHelpers/ObjectiveHelpers';


class Objectives extends Component {
    state = {
        loading: false,
        error: false,
        errorMessage: null
    }


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

    submit = (tree) => {
        const flatData = getFlatDataFromTree({
            treeData: tree,
            getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
            ignoreCollapsed: false, // Makes sure you traverse every node in the tree, not just the visible ones
        }).map(({ node, path }) => ({
            title: node.title,
            max100: node.max100,
            smarter: node.smarter,
            swing: node.swing
        }));
        let data = {
            data: flatData
        }
        axios.post('/responses/.json', data)
            .then(response => {
                console.log(response)
                this.props.history.push('/thank-you');
            })
            .catch(error => {
                console.log(error)
            })
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
            let show = '';
            if(this.state.step === 1){
                show = classes.None
            }
            switch(this.props.config){
                case 'max100':
                    return(
                        <div className={ show }>
                            <label className={ classes.Label }>Score:</label>
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
                        <div className={ show }>
                            <label className={ classes.Label }>Min:</label>
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
                            <label className={ classes.Label }>Max:</label>
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
                case 'swing':
                    return(
                        <div className={ show }>
                            <label className={ classes.Label }>Min:</label>
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
                            <label className={ classes.Label }>Max:</label>
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
                            <label className={ classes.Label }>Score:</label>
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

        const changePage = (currentPage, direction) => {
            if(currentPage === 'max100' && direction === 'advance'){
                this.props.history.push('/case/smarter');
            }
            if(currentPage === 'smarter' && direction === 'advance'){
                this.props.history.push('/case/swing-weighting');
            }
            if(currentPage === 'swing' && direction === 'advance'){
                return
            }
            if(currentPage === 'max100' && direction === 'back'){
                return
            }
            if(currentPage === 'smarter' && direction === 'back'){
                this.props.history.push('/case/max100');
            }
            if(currentPage === 'swing' && direction === 'back'){
                this.props.history.push('/case/smarter');
            }
        }

        const disableNav = (currentPage, direction) => {
            if(currentPage === 'max100' && direction === 'back'){
                return true
            }
            if(currentPage === 'swing' && direction === 'advance'){
                return true
            }
            return false
        }

        const validateTree = (tree) => {
            const allData = getFlatDataFromTree({
                treeData: tree,
                getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
                ignoreCollapsed: false, // Makes sure you traverse every node in the tree, not just the visible ones
            }).map(({ node, path }) => ({
                title: node.title,
                max100: node.max100,
                smarter: node.smarter,
                swing: node.swing
            }));
            let invalid = false;
            let errorArray = [];
            allData.map(node => {
                if(!node.max100.score || !node.swing.min || !node.swing.max || !node.swing.score || !node.smarter.min || !node.smarter.max){
                    errorArray.push(node.title);
                    return invalid = true
                } else {
                    return invalid = false
                }
            })
            return invalid
        }

        const getPageName = (page) => {
            switch(page){
                case 'max100': return 'Max 100'
                case 'swing': return 'Swing Weighting'
                case 'smarter': return 'SMARTER'
                default: return null
            }
        }

        const advanceButton = <button 
            onClick={() => changePage(this.props.config, 'advance')}
            disabled={disableNav(this.props.config, 'advance')}>Advance</button>
        
        const goBackButton = <button 
            onClick={() => changePage(this.props.config, 'back')}
            disabled={disableNav(this.props.config, 'back')}>Go Back</button>
        
        const submitButton = <button 
            onClick={() => this.submit(this.props.tree)}
            disabled={validateTree(this.props.tree)}>Submit</button>

        const pageTitle = getPageName(this.props.config);
        
        return (
            <div className={ classes.Container }>
                <div className={ classes.Objectives }>
                    <div className={ classes.Title }>
                        <h2>{ pageTitle }</h2>
                    </div>
                    <div className={ classes.ObjectivesButtons }>
                        <button 
                            className={ classes.None }
                            disabled
                            onClick={() => {
                                const newTopLevel = newNode();
                                this.props.onTreeUpdate({treeData: this.props.tree.concat(newTopLevel)});
                            }}
                        >
                            Add Top Level Objective
                        </button>
                        { goBackButton }
                        { advanceButton }
                        { submitButton }
                    </div>
                    <SortableTree
                        canDrop={ canDrop }
                        style={ {height: '80%'} }
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
                                    className={ classes.None }
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
                                    className={ classes.None }
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