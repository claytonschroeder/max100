import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SortableTree, { addNodeUnderParent, removeNodeAtPath, changeNodeAtPath, toggleExpandedForAll, getFlatDataFromTree } from 'react-sortable-tree';

import Modal from '../../../components/UI/Modal/Modal';

import axios from '../../../axios';
import * as actionCreators from '../../../store/actions/index';

import classes from './Objectives.css';
import { newNode } from './ObjectiveHelpers/ObjectiveHelpers';


class Objectives extends Component {
    state = {
        showModal: true,
        loading: false,
        error: false,
        errorMessage: null,
        step: 0,
        steps: 2
    }

    expand = (expanded) => {
        this.props.onTreeUpdate({
            [this.props.config]: toggleExpandedForAll({
                treeData: this.props[this.props.config],
                expanded,
            }),
        });
    }

    submit = (tree, key) => {
        const flatData = getFlatDataFromTree({
            treeData: tree,
            getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
            ignoreCollapsed: false, // Makes sure you traverse every node in the tree, not just the visible ones
        }).map(({ node, path }) => ({
            title: node.title,
            [key]: node[key]
        }));
        let data = {
            data: flatData
        }
        axios.post(`/${key}/.json`, data)
            .then(response => {
                this.props.history.push('/thank-you');
            })
            .catch(error => {
                console.log(error)
            })
    };

    closeModal = (event) => {
        this.setState({
            showModal: false
        })
    };

    render () {
        const data = this.props[this.props.config];
        const key = this.props.config;
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
            if(this.state.step < this.state.steps){
                show = classes.None
            }
            switch(this.props.config){
                case 'max100':
                    return(
                        <div className={ show }>
                            <label className={ classes.Label }>Score:</label>
                            <input
                                className={ classes.Highlight }
                                type='number'
                                min={0}
                                max={100}
                                value={node.max100.score ? node.max100.score : ''}
                                onChange={event => {
                                    const score = event.target.value;
                                    console.log(score)
                                    const changedNode = changeNodeAtPath({treeData: this.props[key], path, getNodeKey, newNode: {...node, max100: {score}}});
                                    console.log(changedNode)
                                    this.props.onTreeUpdate({
                                        [key]: changeNodeAtPath({
                                            treeData: this.props[key],
                                            path,
                                            getNodeKey,
                                            newNode: { 
                                                ...node,
                                                max100: {score} 
                                            },
                                        }),
                                    }, key);
                                }}
                            />
                        </div>
                    )
                case 'smarter':
                    return(
                        <div className={ show }>
                            <label className={ classes.Label }>Min:</label>
                            <input
                                className={ classes.Highlight }
                                type='number'
                                min={0}
                                max={100}
                                value={node.smarter.min ? node.smarter.min : ''}
                                onChange={event => {
                                    const min = event.target.value;
                                    this.props.onTreeUpdate({
                                        [key]: changeNodeAtPath({
                                            treeData: this.props[key],
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
                                className={ classes.Highlight }
                                type='number'
                                min={0}
                                max={100}
                                value={node.smarter.max ? node.smarter.max : ''}
                                onChange={event => {
                                    const max = event.target.value;
                                    this.props.onTreeUpdate({
                                        [key]: changeNodeAtPath({
                                            treeData: this.props[key],
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
                                className={ classes.Highlight }
                                type='number'
                                min={0}
                                max={100}
                                value={node.swing.min ? node.swing.min : ''}
                                onChange={event => {
                                    const min = event.target.value;
                                    this.props.onTreeUpdate({
                                        [key]: changeNodeAtPath({
                                            treeData: this.props[key],
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
                                className={ classes.Highlight }
                                type='number'
                                min={0}
                                max={100}
                                value={node.swing.max ? node.swing.max : ''}
                                onChange={event => {
                                    const max = event.target.value;
                                    this.props.onTreeUpdate({
                                        [key]: changeNodeAtPath({
                                            treeData: this.props[key],
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
                                className={ classes.Highlight }
                                type='number'
                                min={0}
                                max={100}
                                value={node.swing.score ? node.swing.score : ''}
                                onChange={event => {
                                    const score = event.target.value;
                                    this.props.onTreeUpdate({
                                        [key]: changeNodeAtPath({
                                            treeData: this.props[key],
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
            if(direction === 'advance' && (this.state.step < this.state.steps)){
                if(this.state.step === 0){
                    this.expand(false)
                }
                if(this.state.step=== 1){
                    this.expand(true);
                }
                this.setState({step: this.state.step + 1})
            }
            if(direction === 'back' && (this.state.step >= 1)){
                if(this.state.step === 2){
                    this.expand(false)
                }
                if(this.state.step=== 1){
                    this.expand(true);
                }
                this.setState({step: this.state.step - 1})
            }
        }

        const validateTree = (tree, key) => {
            const allData = getFlatDataFromTree({
                treeData: tree,
                getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
                ignoreCollapsed: false, // Makes sure you traverse every node in the tree, not just the visible ones
            }).map(({ node, path }) => ({
                title: node.title,
                [key]: node[key]
            }));
            let invalid = false;
            let errorArray = [];
            allData.map(node => {
                if(key === 'max100'){
                    if(!node.max100.score){
                        errorArray.push(node.title);
                        return invalid = true
                    }
                }
                if(key === 'swing'){
                    if(!node.swing.min || !node.swing.max || !node.swing.score){
                        errorArray.push(node.title);
                        return invalid = true
                    }
                }
                if(key === 'smarter'){
                    if(!node.smarter.min || !node.smarter.max){
                        errorArray.push(node.title);
                        return invalid = true
                    }
                }
            })
            return invalid
        }

        const getPageInstructions = (step) => {
            switch(step){
                case 0: return 'For each objective, organize the sub-objectives in your preffered order. Click on the "plus" button to the left of each objective. To move the items, click and drag the grey box on the left side of the box.'
                case 1: return 'Rank the top-level objectives in your preffered order. (Note: You can click on the "minus" button to collapse the sub-objectives)'
                case 2: return 'Lastly, enter the scores for each sub-objective and objective. Once all the scores have been entered, Click the submit button.'
                default: return null
            }
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
            className={ classes.Button } 
            onClick={() => changePage(this.props.config, 'advance')}
            disabled={this.state.step === this.state.steps}>Advance</button>
        
        const goBackButton = <button
            className={ classes.Button } 
            onClick={() => changePage(this.props.config, 'back')}
            disabled={this.state.step === 0}>Go Back</button>
        
        const submitButton = <button
            className={ validateTree(this.props[key], key) ? classes.None : classes.ButtonSubmit }  
            onClick={() => this.submit(this.props[key], key)}
            disabled={validateTree(this.props[key], key)}>Submit</button>

        const pageTitle = getPageName(this.props.config);

        const pageInstructions = getPageInstructions(this.state.step);

        const modal = this.state.showModal ? (<Modal close={ this.closeModal } title={ pageTitle }/>) : null
        
        const getCustomStyle = (step, node) => {
            if(step === 0 && !node.children){
                return {boxShadow: '0 0 0 3px green'}
            } else if(step === 1 && node.children){
                return {boxShadow: '0 0 0 3px green'}
            } else if(step === 1 && !node.children){
                return {color: '#ddd', pointerEvents: 'none'}
            } else if(step === 2){
                return null
            } else {
                return {color: '#ddd', pointerEvents: 'none'}
            }
        }
        return (
            <div className={ classes.Container }>
                { modal }
                <div className={ classes.Objectives }>
                    <div className={ classes.Title }>
                        <h2>{ pageTitle }</h2>
                        <p className={ classes.Intructions }>{ pageInstructions }</p>
                    </div>
                    <div className={ classes.ObjectivesButtons }>
                        <button 
                            className={ classes.None }
                            disabled
                            onClick={() => {
                                const newTopLevel = newNode();
                                this.props.onTreeUpdate({[key]: this.props.tree.concat(newTopLevel)});
                            }}
                        >
                            Add Top Level Objective
                        </button>
                        { goBackButton }
                        { advanceButton }
                        { submitButton }
                    </div>
                    <SortableTree
                        canDrag={ this.state.step === 2 ? false : true }
                        canDrop={ canDrop }
                        style={ {height: '80%'} }
                        rowHeight={50}
                        innerStyle={{paddingLeft: '30px'}}
                        treeData={ data }
                        onChange={treeData => this.props.onTreeUpdate({[key]: treeData}, key)}
                        generateNodeProps={({ node, path }) => {
                            return ({
                            /*title: (
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
                            ),*/
                            style: getCustomStyle(this.state.step, node),
                            buttons: [
                                <button
                                    className={ classes.None }
                                    onClick={() => {
                                        const newChildNode = newNode();
                                        this.props.onTreeUpdate({
                                            [key]: addNodeUnderParent({
                                                [key]: this.props.tree,
                                                parentKey: path[path.length - 1],
                                                expandParent: true,
                                                getNodeKey,
                                                newNode: newChildNode,
                                            })[key],
                                        });
                                    }}
                                >
                                    Add Sub-Objective
                                </button>,
                                <button
                                    className={ classes.None }
                                    onClick={() => {
                                        this.props.onTreeUpdate({
                                            [key]: removeNodeAtPath({
                                                [key]: this.props.tree,
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
                        }
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        swing: state.swing,
        smarter: state.smarter,
        max100: state.max100
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTreeUpdate: (treeData, key) => dispatch(actionCreators.updateTree(treeData, key))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Objectives));