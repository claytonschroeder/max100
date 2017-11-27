import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SortableTree, { addNodeUnderParent, removeNodeAtPath, changeNodeAtPath, getFlatDataFromTree } from 'react-sortable-tree';

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
        steps: (this.props[this.props.config].length * 2) + 1
    }

    expand = (expanded) => {
        
        // this.props.onTreeUpdate({
        //     [this.props.config]: toggleExpandedForAll({
        //         treeData: this.props[this.props.config],
        //         expanded,
        //     }),
        // });
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
            name: this.props.name,
            data: flatData
        }
        axios.post(`/${key}.json`, data)
            .then(response => {
                this.props.history.push('/thank-you');
            })
            .catch(error => {
                console.log(error)
            })
    };

    showModal = () => {
        this.setState({
            showModal: true
        })
    }

    closeModal = (event) => {
        this.setState({
            showModal: false
        })
    };

    render () {
        const tree = [...this.props[this.props.config]]
        tree.map((node, index) => {
            if(index === 0){
                node[this.props.config].score = '100'
            }
            node.children.map((child, index) => {
                if(index === 0){
                    child[this.props.config].score = '100'
                }
            })
        })
        if(this.state.step < (tree.length)){
            tree.map((node, index) => {
                if(this.state.step === index){
                    node.expanded = true
                } else {
                    node.expanded = false
                }
            })
        }
        if(this.state.step > tree.length){
            const step = this.state.step - 5;
            tree.map((node, index) => {
                if(step === index){
                    node.expanded = true
                } else {
                    node.expanded = false
                }
            })
        }
        if(this.state.step === tree.length){
            tree.map((node, index) => {
                return node.expanded = false
            })
        }

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
        const findScore = (node, path) => {
            let score
            if((path.length === 1) && (path[0] === 0)){
                score = 100;
                return score
            } else {
                score = node.max100.score ? node.max100.score : ''
                return score
            }
        }
        const getInputs = (node, path) => {
            let show = '';
            if(this.state.step < ((this.state.steps + 1)/2) ){
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
                                min={ 0 }
                                max={ 100 }
                                value={ findScore(node, path)}
                                onChange={event => {
                                    const score = event.target.value;
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
                                min={ 0 }
                                max={ 100 }
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
                                min={ 0 }
                                max={ 100 }
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
                                disabled
                                className={ classes.Highlight }
                                type='number'
                                min={ 0 }
                                max={ 100 }
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
                                disabled
                                className={ classes.Highlight }
                                type='number'
                                min={ 0 }
                                max={ 100 }
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
                                min={ 0 }
                                max={ 100 }
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
                this.setState({step: this.state.step + 1})
            }
            if(direction === 'back' && (this.state.step >= 1)){
                this.setState({step: this.state.step - 1})
            }
        }
        const validateTree = (tree, key) => {
            if(key === 'smarter'){
                return false
            }
            const allData = getFlatDataFromTree({
                treeData: tree,
                getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
                ignoreCollapsed: false, // Makes sure you traverse every node in the tree, not just the visible ones
            }).map(({ node, path }) => ({
                title: node.title,
                [key]: node[key]
            }));
            let invalid
            let errorArray = [];
            allData.map(node => {
                if(!node[key].score){
                    errorArray.push(node.title);
                }
                invalid = errorArray.length > 0 ? true : false
            })
            return invalid
        }
        const getPageInstructions = (step) => {
            switch(step){
                case 0: return 'Please drag and drop the sub-objectives in order from most important to least important.'
                case 1: return 'Please drag and drop the sub-objectives in order from most important to least important.'
                case 2: return 'Please drag and drop the sub-objectives in order from most important to least important.'
                case 3: return 'Please drag and drop the sub-objectives in order from most important to least important.'
                case 4: return 'Please drag and drop the objectives in order for most important to least important'
                case 5: return 'Please provide a score to the sub-objectives on a scale of 0-100. Your top ranked sub-objective should recieve a score of 100, while the rest should recieve score below 100.'
                case 6: return 'Please provide a score to the sub-objectives on a scale of 0-100. Your top ranked sub-objective should recieve a score of 100, while the rest should recieve score below 100.'
                case 7: return 'Please provide a score to the sub-objectives on a scale of 0-100. Your top ranked sub-objective should recieve a score of 100, while the rest should recieve score below 100.'
                case 8: return 'Please provide a score to the sub-objectives on a scale of 0-100. Your top ranked sub-objective should recieve a score of 100, while the rest should recieve score below 100.'
                case 9: return 'Please provide a score to the objectives on a scale of 0-100. Your top ranked objective should recieve a score of 100, while the rest should recieve score below 100.'
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
        const infoButton = <button
            className={ classes.Button } 
            onClick={() => this.showModal()}>Info</button>
        const advanceButton = <button
            className={ classes.Button } 
            onClick={() => changePage(this.props.config, 'advance')}
            disabled={this.state.step === this.state.steps}>Advance</button>
        const goBackButton = <button
            className={ classes.Button } 
            onClick={() => changePage(this.props.config, 'back')}
            disabled={this.state.step === 0}>Go Back</button>
        
        const submitButton = <button
            className={ validateTree(tree, key) ? classes.None : classes.ButtonSubmit }  
            onClick={() => this.submit(tree, key)}
            disabled={validateTree(tree, key)}>Submit</button>

        const pageTitle = getPageName(this.props.config);
        const pageInstructions = getPageInstructions(this.state.step);
        const modal = this.state.showModal ? (<Modal close={ this.closeModal } title={ pageTitle }/>) : null
        
        const getCustomStyle = (step, node) => {
            if(step < tree.length && !node.children){
                return {boxShadow: '0 0 0 3px green'}
            }
            if(step < tree.length && node.children) {
                return {color: '#ddd', pointerEvents: 'none'}
            }
            if(step === tree.length && node.children) {
                return {boxShadow: '0 0 0 3px green'}
            }
            if(step > tree.length && !node.children){
                return {boxShadow: '0 0 0 3px green'}
            }
            if(step > tree.length && step < this.state.steps && node.children){
                return {color: '#ddd', pointerEvents: 'none'}
            }
            if(step === this.state.steps && node.children){
                return {boxShadow: '0 0 0 3px green'}
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
                        { infoButton }
                    </div>
                    <SortableTree
                        canDrag={ this.state.step <= (this.state.steps / 2) }
                        canDrop={ canDrop }
                        style={ {height: '80%'} }
                        rowHeight={50}
                        innerStyle={{paddingLeft: '30px'}}
                        treeData={ tree }
                        onChange={treeData => this.props.onTreeUpdate({[key]: treeData}, key)}
                        generateNodeProps={({ node, path }) => {
                            return ({
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
        name: state.name,
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