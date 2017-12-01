import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SortableTree, { addNodeUnderParent, removeNodeAtPath, changeNodeAtPath } from 'react-sortable-tree';

import axios from '../../../axios';
import * as actionCreators from '../../../store/actions/index';

import classes from './Objectives.css';
import { newNode } from './ObjectiveHelpers/ObjectiveHelpers';


class ObjectivesEditor extends PureComponent {
    state = {
        validationArray: [],
        loading: true,
        error: false,
        errorMessage: null,
        step: 0,
        steps: this.props.config === 'max100' || this.props.config === 'swing' ? (this.props[this.props.config].length * 2) + 2 : this.props[this.props.config].length + 1
    }

    componentDidMount(){
        axios.get(`/${this.props.config}structure.json`)
            .then(response => {
                this.props.onTreeUpdate({[this.props.config]: response.data.data})
                this.setState({loading: false})
            })
            .catch(err => {
                alert(err)
            })
    }

    saveTree = (tree, config) => {
        this.setState({loading: true})
        axios.put(`/${this.props.config}structure.json`, {data: tree})
            .then(response => {
                console.log(response)
                this.setState({loading: false})
            })
            .catch(error => {
                alert(error)
            })
    }

    render () {
        let loading = null;
        if(this.state.loading){
            loading = (<p>Loading...</p>)
        }
        const key = this.props.config;
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
                    return (<div></div>)
                case 'smarter':
                    return(
                        <div className={ '' }>
                            <label className={ classes.Label }>Scale:</label>
                            <input
                                className={ '' }
                                type='text'
                                value={node.pm ? node.pm : ''}
                                onChange={event => {
                                    const pm = event.target.value;
                                    this.props.onTreeUpdate({
                                        [key]: changeNodeAtPath({
                                            treeData: this.props[key],
                                            path,
                                            getNodeKey,
                                            newNode: { 
                                                ...node,
                                                pm
                                            },
                                        }),
                                    });
                                }}
                            />
                            <label className={ classes.Label }>Direction:</label>
                            <select 
                                className={ '' } 
                                type="select" 
                                value={ node.direction ? node.direction : '' } 
                                onChange={event => {
                                    const direction = event.target.value;
                                    this.props.onTreeUpdate({
                                        [key]: changeNodeAtPath({
                                            treeData: this.props[key],
                                            path,
                                            getNodeKey,
                                            newNode: { 
                                                ...node,
                                                direction
                                            },
                                        }),
                                    });
                                }}>
                                <option value='higher'>Higher is better</option>
                                <option value='lower'>Lower is better</option>
                            </select>
                            <label className={ classes.Label }>Min:</label>
                            <input
                                className={ '' }
                                type='text'
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
                                className={ '' }
                                type='text'
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
                        <div className={ '' }>
                            <label className={ classes.Label }>Scale:</label>
                            <input
                                className={ '' }
                                type='text'
                                value={node.pm ? node.pm : ''}
                                onChange={event => {
                                    const pm = event.target.value;
                                    this.props.onTreeUpdate({
                                        [key]: changeNodeAtPath({
                                            treeData: this.props[key],
                                            path,
                                            getNodeKey,
                                            newNode: { 
                                                ...node,
                                                pm
                                            },
                                        }),
                                    });
                                }}
                            />
                            <label className={ classes.Label }>Direction:</label>
                            <select 
                                className={ '' } 
                                type="select" 
                                value={ node.direction ? node.direction : '' } 
                                onChange={event => {
                                    const direction = event.target.value;
                                    this.props.onTreeUpdate({
                                        [key]: changeNodeAtPath({
                                            treeData: this.props[key],
                                            path,
                                            getNodeKey,
                                            newNode: { 
                                                ...node,
                                                direction
                                            },
                                        }),
                                    });
                                }}>
                                <option value='higher'>Higher is better</option>
                                <option value='lower'>Lower is better</option>
                            </select>
                            <label className={ classes.Label }>Min:</label>
                            <input
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
                        </div>
                    )
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

        const pageTitle = getPageName(this.props.config);

        const getNodeKey = ({ treeIndex }) => treeIndex;

        return (
            <div className={ classes.Container }>
                {
                   loading ? loading : (
                    <div className={ classes.Objectives }>
                        <div className={ classes.Title }>
                            <h2>{ pageTitle }</h2>
                        </div>
                        <div className={ classes.ObjectivesButtons }>
                            <button 
                                className={ '' }
                                onClick={() => {
                                    const newTopLevel = newNode(key, 'top');
                                    this.props.onTreeUpdate({[key]: [...this.props[this.props.config]].concat(newTopLevel)});
                                }}
                            >
                                Add Top Level Objective
                            </button>
                            <button onClick={ () => this.saveTree(this.props[this.props.config], this.props.config) }>
                                Save Tree To Database
                            </button>
                        </div>
                        <SortableTree
                            canDrop={ canDrop }
                            style={ {height: '80%'} }
                            rowHeight={50}
                            innerStyle={{paddingLeft: '30px'}}
                            treeData={ [...this.props[this.props.config]] }
                            onChange={treeData => this.props.onTreeUpdate({[key]: treeData}, key)}
                            generateNodeProps={({ node, path }) => {
                                return ({
                                    title: (
                                        <input
                                            className={ '' }
                                            type='text'
                                            value={node.title ? node.title : ''}
                                            onChange={event => {
                                                const title = event.target.value;
                                                this.props.onTreeUpdate({
                                                    [key]: changeNodeAtPath({
                                                        treeData: [...this.props[this.props.config]],
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
                                            className={ !node.children ? classes.None : '' }
                                            onClick={() => {
                                                const newChildNode = newNode(key, 'child');
                                                const addedNode = addNodeUnderParent({
                                                    treeData: [...this.props[this.props.config]],
                                                    parentKey: path[path.length - 1],
                                                    getNodeKey,
                                                    expandParent: true,
                                                    newNode: newChildNode,
                                                })
                                                this.props.onTreeUpdate({
                                                    [key]: addedNode.treeData
                                                });
                                            }}
                                        >
                                            Add Sub-Objective
                                        </button>,
                                        <button
                                            className={ '' }
                                            onClick={() => {
                                                this.props.onTreeUpdate({
                                                    [key]: removeNodeAtPath({
                                                        treeData: [...this.props[this.props.config]],
                                                        getNodeKey,
                                                        path,
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
                   )
                
                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ObjectivesEditor));