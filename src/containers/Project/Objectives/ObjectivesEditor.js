import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SortableTree, { addNodeUnderParent, removeNodeAtPath, changeNodeAtPath, getFlatDataFromTree } from 'react-sortable-tree';

import Modal from '../../../components/UI/Modal/Modal';

import axios from '../../../axios';
import * as actionCreators from '../../../store/actions/index';

import classes from './Objectives.css';
import { newNode } from './ObjectiveHelpers/ObjectiveHelpers';


class Objectives extends PureComponent {
    state = {
        validationArray: [],
        showModal: true,
        loading: false,
        error: false,
        errorMessage: null,
        step: 0,
        steps: this.props.config === 'max100' || this.props.config === 'swing' ? (this.props[this.props.config].length * 2) + 2 : this.props[this.props.config].length + 1
    }

    componentWillMount(){
        // cofirms the user has supplied a name before starting
        const name = this.props.name ? true : false;
        if(!name){
            this.props.history.push('/')
        }
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
                //replace the history so user cannot navigate back
                this.props.history.replace('/thank-you');
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
        if(this.props.config !== 'smarter' && (this.state.step > ((this.state.steps -1)/2)) ){
            tree.map((node, index) => {
                if(index === 0){
                    node[this.props.config].score = '100'
                }
                node.children.map((child, i) => {
                    if(i === 0){
                        child[this.props.config].score = '100'
                    }
                })
            })
        }
        if(this.state.step < (tree.length)){
            tree.map((node, index) => {
                if(this.state.step === index){
                    return node.expanded = true
                } else {
                    return node.expanded = false
                }
            })
        }
        if(this.state.step > tree.length){
            const step = this.state.step - 5;
            tree.map((node, index) => {
                if(step === index){
                    return node.expanded = true
                } else {
                    return node.expanded = false
                }
            })
        }
        if(this.state.step === tree.length){
            tree.map((node, index) => {
                return node.expanded = false
            })
        }
        if(this.state.step === this.state.steps){
            tree.map((node, index) => {
                return node.expanded = true
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
        const canDrag = (page) => {
            if(this.state.step === this.state.steps){
                return true
            }
            if(page === 'max100' || page === 'swing-weighting'){
                return this.state.step <= ((this.state.steps - 1) / 2)
            } else {
                return true
            }
        }

        const getInputs = (node, path) => {
            let show = '';
            if(this.props.config === 'swing' || this.props.config === 'max100'){
                if(this.state.step < ((this.state.steps)/2) ){
                    show = classes.None
                }
                if(this.state.step < (this.state.steps - 1) && node.children){
                    show = classes.None
                }
            }

            switch(this.props.config){
                case 'max100':
                    return(
                        <div className={ show }>
                            <label className={ classes.Label }>Rating:</label>
                            <input
                                className={ node.max100.score === '' ? classes.HighlightRed : classes.HighlightGreen }
                                type='number'
                                min={ 0 }
                                max={ 100 }
                                value={ node.max100.score ? node.max100.score : ''}
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
                                disabled
                                className={ '' }
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
                                disabled
                                className={ '' }
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
                                className={ '' }
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
                                className={ '' }
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
                            <label className={ classes.Label }>Rating:</label>
                            <input
                                className={ node.swing.score === '' ? classes.HighlightRed : classes.HighlightGreen }
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
            if(this.state.step !== this.state.steps){
                return true
            }
            if(key === 'smarter'){
               if(this.state.step === this.state.steps){
                    return false
                } else {
                    return true
                }
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
            let validationArray = [];
            allData.map(node => {
                if(!node[key].score){
                    validationArray.push(node.title);
                }
                invalid = validationArray.length > 0 ? true : false
            })
            return invalid
        }
        const getPageInstructions = (step) => {
            if(this.props.config === 'smarter'){
                switch(step){
                    case 0: return 'Please drag and drop the sub-objectives in order from most important to least important.';
                    case 1: return 'Please drag and drop the sub-objectives in order from most important to least important.';
                    case 2: return 'Please drag and drop the sub-objectives in order from most important to least important.';
                    case 3: return 'Please drag and drop the sub-objectives in order from most important to least important.';
                    case 4: return 'Please drag and drop the objectives in order for most important to least important';
                    case 5: return 'Please review your ranks and rating for each objective and sub-objective. All fields must be filled in to submit.';
                    default: return null;
                }
            }
            switch(step){
                case 0: return 'Please drag and drop the sub-objectives in order from most important to least important.';
                case 1: return 'Please drag and drop the sub-objectives in order from most important to least important.';
                case 2: return 'Please drag and drop the sub-objectives in order from most important to least important.';
                case 3: return 'Please drag and drop the sub-objectives in order from most important to least important.';
                case 4: return 'Please drag and drop the objectives in order for most important to least important';
                case 5: return 'Please provide a rating to the sub-objectives on a scale of 0-100. Your top ranked sub-objective should recieve a score of 100, while the rest should recieve score below 100.';
                case 6: return 'Please provide a rating to the sub-objectives on a scale of 0-100. Your top ranked sub-objective should recieve a score of 100, while the rest should recieve score below 100.';
                case 7: return 'Please provide a rating to the sub-objectives on a scale of 0-100. Your top ranked sub-objective should recieve a score of 100, while the rest should recieve score below 100.';
                case 8: return 'Please provide a rating to the sub-objectives on a scale of 0-100. Your top ranked sub-objective should recieve a score of 100, while the rest should recieve score below 100.';
                case 9: return 'Please provide a rating to the objectives on a scale of 0-100. Your top ranked objective should recieve a score of 100, while the rest should recieve score below 100.';
                case 10: return 'Please review your ranks and rating for each objective and sub-objective. All fields must be filled in to submit.';
                default: return null;
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

        const validateAdvance = (step, steps) => {
            if(step === steps){
                return true
            }
            if(this.props.config !== 'smarter'){
                let index;
                let validateAdvanceArray = [];
                if(step >= (steps/2)){
                    index = (step - (steps/2))
                    if(index === tree.length){
                        tree.map(objective => {
                            if(objective[this.props.config].score === ''){
                                return validateAdvanceArray.push(objective)
                            }
                        })
                    }
                    tree.map((objs, i) => {
                        if(i === index){
                            objs.children.map(child => {
                                if(child[this.props.config].score === ''){
                                   return validateAdvanceArray.push(child)
                                }
                            })
                        }
                    })
                    if(validateAdvanceArray.length > 0){
                        return true
                    } else {
                        return false
                    }
                }
                if(step === steps){
                    return true
                }
            } else {
                return false
            }
        }

        const infoButton = <button
            className={ classes.Button } 
            onClick={() => this.showModal()}>Info</button>
        const advanceButton = <button
            className={ classes.Button } 
            onClick={() => changePage(this.props.config, 'advance')}
            disabled={ validateAdvance(this.state.step, this.state.steps)}>Advance</button>
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
            if(step > tree.length && step < (this.state.steps -1) && node.children){
                return {color: '#ddd', pointerEvents: 'none'}
            }
            if(step === (this.state.steps - 1) && node.children){
                return {boxShadow: '0 0 0 3px green'}
            }
            if(step === this.state.steps){
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
                        canDrag={ canDrag(this.props.config) }
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