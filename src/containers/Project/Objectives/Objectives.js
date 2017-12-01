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
        toggleAll: false,
        showModal: true,
        loading: true,
        error: false,
        errorMessage: null,
        step: 0,
        steps: (this.props.config === 'max100' || this.props.config === 'swing') ? ((this.props[this.props.config].length * 2) + 2) : (this.props[this.props.config].length + 1)
    }
    
    componentWillMount(){
        // cofirms the user has supplied a name before starting
        const name = this.props.name ? true : false;
        if(!name){
            this.props.history.push('/')
        }
    }

    componentDidMount(){
        if(this.props.name){
            axios.get(`/${this.props.config}structure.json`)
                .then(response => {
                    this.props.onTreeUpdate({[this.props.config]: response.data.data})
                    this.setState({
                        loading: false,
                        steps: (this.props.config === 'max100' || this.props.config === 'swing') ? ((response.data.data.length * 2) + 2) : (response.data.data.length + 1)
                    })
                })
                .catch(err => {
                    alert(err)
                })
        }
    }

    submit = (tree, key) => {
        const flatData = getFlatDataFromTree({
            treeData: tree,
            getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
            ignoreCollapsed: false, // Makes sure you traverse every node in the tree, not just the visible ones
        }).map(({ node, path }) => {
            let parent;
            if(path.length === 2){
                let parentId = path[0];
                parent = tree.filter(objective => { 
                    if(objective.id === parentId) {
                        return objective
                    }
                })
            } else {
                parent = null
            }
            let parentTitle;
            if(parent){
                parentTitle = parent[0].title
            } else {
                parentTitle = 'No parent'
            }
            return ({
                name: this.props.name,
                level: node.children ? 'top' : 'sub',
                title: node.title,
                [key]: node[key],
                parent: parentTitle
            })
        });
        let data = {
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
        let loading = null;
        const tree = [...this.props[this.props.config]];
        if(this.state.loading){
            loading = (<p>Loading...</p>)
        }
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
            const step = this.state.step - (this.state.steps/2);
            tree.map((node, index) => {
                if(step === index){
                    return node.expanded = true
                } else {
                    return node.expanded = false
                }
            })
        }
        if(this.state.step > this.state - 1){
            const step = this.state.step - (this.state.steps/2);
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
        if(this.state.toggleAll){
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
            if(this.state.toggleAll){
                return false
            }
            if(this.state.step === this.state.steps){
                return false
            }
            if(page === 'max100' || page === 'swing-weighting'){
                return this.state.step <= ((this.state.steps - 1) / 2)
            } else {
                return true
            }
        }
        const getInputs = (node, path) => {
            let show = '';
            if(this.props.config === 'swing'){
                if((this.state.step < ((this.state.steps)/2) - 1) && node.children){
                    show = classes.None
                }
                if(this.state.step > (this.state.steps/2) -1){
                    if((this.state.step !== this.state.steps - 1) && node.children){
                        show = classes.None
                    }
                    if(this.state.step === this.state.steps){
                        show = ''
                    }
                }
            }
            if(this.props.config === 'max100'){
                if(this.state.step < ((this.state.steps)/2) ){
                    show = classes.None
                }
                if(this.state.step < (this.state.steps - 1) && node.children){
                    show = classes.None
                }
            }

            const scale = node.children ? null : (
                <div style={ {display: 'inline-block'} }>
                    <label className={ classes.Label }>Scale:</label>
                    <span>{ node.pm ? node.pm : ''}</span>
                </div>
            )

            const input = this.state.step === this.state.steps ? (<span>{ node[this.props.config].score }</span>) : (
                <input
                    disabled = { this.state.step === this.state.steps }
                    className={ node[this.props.config].score === '' || (parseInt(node[this.props.config].score) > 100) ? classes.HighlightRed : classes.HighlightGreen }
                    type='number'
                    min={ 0 }
                    max={ 100 }
                    value={ node[this.props.config].score ? node[this.props.config].score : ''}
                    onChange={event => {
                        const score = event.target.value;
                        this.props.onTreeUpdate({
                            [key]: changeNodeAtPath({
                                treeData: this.props[key],
                                path,
                                getNodeKey,
                                newNode: { 
                                    ...node,
                                    [this.props.config]: {score} 
                                },
                            }),
                        }, key);
                    }}
                />
            )
            
            switch(this.props.config){
                case 'max100':
                    return(
                        <div className={ show }>
                            <label className={ classes.Label }>Rating:</label>
                            { input }
                        </div>
                    )
                case 'smarter':
                    return(
                        <div className={ show }>
                            { scale }
                            <label className={ classes.Label }>Direction:</label>
                            <span>{ node.direction && node.direction === 'higher' ? 'H' : 'L' }</span>
                            <label className={ classes.Label }>Min:</label>
                            <span>{ node.smarter.min }</span>
                            <label className={ classes.Label }>Max:</label>
                            <span>{ node.smarter.max }</span>
                        </div>
                    )
                case 'swing':
                    return(
                        <div className={ show }>
                            { scale }
                            <label className={ classes.Label }>Direction:</label>
                            <span>{ node.direction && node.direction === 'higher' ? 'H' : 'L' }</span>
                            <label className={ classes.Label }>Min:</label>
                            <span>{ node.swing.min }</span>
                            <label className={ classes.Label }>Max:</label>
                            <span>{ node.swing.max }</span>
                            <label className={ classes.Label } hidden={ this.state.step < (this.state.steps/2) }>Rating:</label>
                            <input
                                className={ node.swing.score === '' || (parseInt(node.swing.score) > 100) ? classes.HighlightRed : classes.HighlightGreen }
                                hidden={ this.state.step < (this.state.steps/2) }
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
                this.setState({step: this.state.step + 1, toggleAll: false})
            }
            if(direction === 'back' && (this.state.step >= 1)){
                this.setState({step: this.state.step - 1, toggleAll: false})
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
                console.log(typeof(node[key].score))
                if(!node[key].score){
                    validationArray.push(node.title);
                }
                invalid = validationArray.length > 0 ? true : false
            })
            return invalid
        }
        const getPageInstructions = (step, steps) => {
            if(this.props.config === 'smarter'){
                if(step < ((steps-1))){
                    return (
                        <div>
                            <h3>Sub-Criteria Ranking</h3>
                            <p><strong>First, please rank the following sub-criteria under each main criterion in order from most important to least important.</strong></p>
                            <p>Note that you cannot indicate ties here, but later you will have an opportunity to identify cases that are "too close to call".</p>
                            <p>Please drag and drop the sub-criteria in order from most important to least important.</p>
                        </div>
                    )
                }
                if(step === (steps -1)){
                    return (
                        <div>
                            <h3>Main-Criteria Ranking</h3>
                            <p><strong>Next, please drag and drop the following main criteria to rank them in order from most important to least important.</strong></p>
                            <p>When ranking main criteria, keep in mind that you are ranking the importance of each criterion group, including their sub-criteria, relative to one another.</p>
                        </div>
                    )
                }
                if(step === steps){
                    return (
                        <div>
                            <h3>Review</h3>
                            <p>Please review your ranks and rating for each criterion and sub-criterion. You may edit the ranking or ratings if you wish by clicking ‘Go Back’. When you are satisfied, please click ‘Submit’ to finish.</p>
                        </div>
                    )
                }
            } else {
                if(step < ((steps/2)-1)){
                    return (
                        <div>
                            <h3>RANKING: Sub-Criteria</h3>
                            <p><strong>First, please rank the following sub-criteria under each main criterion in order from most important to least important.</strong></p>
                            <p>Note that you cannot indicate ties here, but later you will have an opportunity to identify cases that are "too close to call".</p>
                            <p>Please drag and drop the sub-criteria in order from most important to least important.</p>
                        </div>
                    )
                }
                if(step === ((steps/2)-1)){
                    return (
                        <div>
                            <h3>RANKING: Criteria</h3>
                            <p><strong>Next, please drag and drop the following main criteria to rank them in order from most important to least important.</strong></p>
                            <p>When ranking the importance of the main criteria, keep in mind that these criteria represent the performance of their sub-criteria together as a group.  That is, for Technical Performance for example, this should be considered as representing the group consisting of both Longevity and Efficacy. For a reminder of which sub-criteria belong to each criterion, click the Expand All button below.</p>
                        </div>
                    )
                }
                if(step === (steps-1)){
                    return (
                        <div>
                            <h3>RATING: Criteria</h3>
                            <p>Please assign 100 points to the top ranked criterion, then assign between 0 and 100 points for each of the remaining criteria to indicate how important they are relative to the top ranked one.</p>
                            <p>For example, if you assign 100 points to the top ranked criterion and 50 points to second, you are saying the second criterion is about half as important as the first.</p>
                            <p>Once again, keep in mind that the main criteria represent the performance of their sub-criteria together as a group.</p>
                        </div>
                    )
                }
                if(step > ((steps/2)-1) && (step !== steps)){
                    return (
                        <div>
                            <h3>RATING: Sub-Criteria</h3>
                            <p><strong>Now, with these criteria and sub-criteria ranked from most to least important, we'll ask you to assign a rating to each.</strong></p>
                            <p>Please assign 100 points to the top ranked sub-criterion, then assign between 0 and 100 points for each of the remaining sub-criteria to indicate how important they are relative to the top ranked one. For example, if you assign 100 points to the top ranked sub-criterion and 50 points to second, you are saying the second criterion is about half as important as the first.</p>
                            <p>You may assign the same number of points to more than one criterion if you consider them to be of the same importance.</p>
                            <p>When you are done rating the criteria for a group, click ‘Advance’ to continue. You can click ‘Go Back’ at any time if you wish to re-rank these criteria.</p>
                        </div>
                    )
                }
                if(step === steps){
                    return (
                        <div>
                            <h3>Review</h3>
                            <p>Please review your ranks and rating for each criterion and sub-criterion. You may edit the ranking or ratings if you wish by clicking ‘Go Back’. When you are satisfied, please click ‘Submit’ to finish.</p>
                        </div>
                    )
                }
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
                            let score = objective[this.props.config].score;
                            if(score === ''){
                                score = 0
                            } else {
                                score = parseInt(score)
                            }
                            if(score > 100){
                                return validateAdvanceArray.push(objective)
                            }
                            if(objective[this.props.config].score === ''){
                                return validateAdvanceArray.push(objective)
                            }
                        })
                    }
                    tree.map((objs, i) => {
                        if(i === index){
                            objs.children.map(child => {
                                let score = child[this.props.config].score;
                                if(score === ''){
                                    score = 0
                                } else {
                                    score = parseInt(score)
                                }
                                if(score > 100){
                                    return validateAdvanceArray.push(child)
                                }
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
            className={ classes.InfoButton } 
            onClick={() => this.showModal()}>Info</button>
        const toggleExpandButton = <button
                className={ classes.ExpandButton } 
                onClick={() => this.setState({toggleAll: !this.state.toggleAll})}>{ this.state.toggleAll ? "Collapse All" : "Expand All" }</button>
        const advanceButton = <button
            className={ validateAdvance(this.state.step, this.state.steps) ? classes.DisabledButton : classes.AdvanceButton } 
            onClick={() => changePage(this.props.config, 'advance')}
            disabled={ validateAdvance(this.state.step, this.state.steps)}>Advance</button>
        const goBackButton = <button
            className={ this.state.step === 0 ? classes.DisabledButton : classes.BackButton } 
            onClick={() => changePage(this.props.config, 'back')}
            disabled={this.state.step === 0}>Go Back</button>
        
        const submitButton = <button
            className={ validateTree(tree, key) ? classes.None : classes.ButtonSubmit }  
            onClick={() => this.submit(tree, key)}
            disabled={validateTree(tree, key)}>Submit</button>

        const pageTitle = getPageName(this.props.config);
        const pageInstructions = getPageInstructions(this.state.step, this.state.steps);
        const modal = this.state.showModal ? (<Modal close={ this.closeModal } title={ pageTitle }/>) : null
        const getCustomStyle = (step, node) => {
            if(step < tree.length && !node.children){
                return {boxShadow: '0 0 0 3px rgb(157, 208, 228)'}
            }
            if(step < tree.length && node.children) {
                return {color: '#ddd', pointerEvents: 'none'}
            }
            if(step === tree.length && node.children) {
                return {boxShadow: '0 0 0 3px rgb(12, 138, 186)'}
            }
            if(step === tree.length && !node.children) {
                return {color: '#ddd', pointerEvents: 'none'}
            }
            if((step > tree.length) && (step !== (this.state.steps - 1)) && !node.children){
                return {boxShadow: '0 0 0 3px rgb(157, 208, 228)'}
            }
            if(step > tree.length && step < (this.state.steps -1) && node.children){
                return {color: '#ddd', pointerEvents: 'none'}
            }
            if(step === (this.state.steps - 1) && node.children){
                return {boxShadow: '0 0 0 3px rgb(12, 138, 186)'}
            }
            if(step === (this.state.steps - 1) && !node.children){
                return {color: '#ddd', pointerEvents: 'none'}
            }
            if(step === this.state.steps){
                return {boxShadow: '0 0 0 3px rgb(12, 138, 186)'}
            }
        }

        const toggleWarning = this.state.toggleAll ? null : (<p>For a reminder of which sub-criteria belong to each criterion, click the ‘Expand All’ button below.</p>)

        return (  
            loading ? loading : (
                <div className={ classes.Container }>
                    { modal }
                    <div className={ classes.Objectives }>
                        <div className={ classes.Title }>
                            <h2>{ pageTitle }</h2>
                            <div className={ classes.Intructions }>
                                { pageInstructions }
                                { (this.props.config !== 'smarter' && this.state.step === ((this.state.steps/2) - 1)) || (this.props.config !== 'smarter' && this.state.step === (this.state.steps -1)) ? toggleWarning : null }
                                { this.props.config === 'smarter' && this.state.step === (this.state.steps -1) ? toggleWarning : null}
                            </div>
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
                            { this.props.config !== 'smarter' && this.state.step === ((this.state.steps/2) - 1) || this.state.step === (this.state.steps -1) ? toggleExpandButton : null }
                            { this.props.config === 'smarter' && this.state.step ===(this.state.steps -1) ? toggleExpandButton : null}
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
            )
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