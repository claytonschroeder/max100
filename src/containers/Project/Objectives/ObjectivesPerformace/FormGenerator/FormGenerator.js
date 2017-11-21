import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../../../../components/UI/Input/Input';
import * as actionCreators from '../../../../../store/actions/index';
import { updateObject } from '../../../../../store/utility';
import { changeNodeAtPath } from 'react-sortable-tree';
import { intervals, categories } from '../../ObjectiveHelpers/ObjectiveHelpers';

class FormGenerator extends Component {
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        let newObj;
        if(controlName === 'dataType') {
            if(event.target.value === 'interval'){
                //should remove form fields for other dataTypes and add interval
                delete this.props.editNode.controls.cat1name;
                delete this.props.editNode.controls.cat2name;
                delete this.props.editNode.controls.cat3name;
                delete this.props.editNode.controls.cat1val;
                delete this.props.editNode.controls.cat2val;
                delete this.props.editNode.controls.cat3val;
                const mergedControls = {...this.props.editNode.controls, ...intervals()};
                newObj = {
                    ...this.props.editNode,
                    controls: mergedControls
                };
            } else if(event.target.value === 'categorical'){
                //should remove form fields for other dataTypes and add interval
                delete this.props.editNode.controls.min;
                delete this.props.editNode.controls.max;
                delete this.props.editNode.controls.interval;
                const mergedControls = {...this.props.editNode.controls, ...categories()};
                newObj = {
                    ...this.props.editNode,
                    controls: mergedControls
                };
            } else if(event.target.value === 'continuous'){
                //should remove form fields for other dataTypes and add interval
                delete this.props.editNode.controls.min;
                delete this.props.editNode.controls.max;
                delete this.props.editNode.controls.interval;
                delete this.props.editNode.controls.cat1name;
                delete this.props.editNode.controls.cat2name;
                delete this.props.editNode.controls.cat3name;
                delete this.props.editNode.controls.cat1val;
                delete this.props.editNode.controls.cat2val;
                delete this.props.editNode.controls.cat3val;
                newObj = {
                    ...this.props.editNode
                };
            } else {
                newObj = {
                    ...this.props.editNode
                };
            }
        } else {
            newObj = {
                ...this.props.editNode
            };
        };

        const getNodeKey = ({ treeIndex }) => treeIndex;
        const updatedControls = {
            ...newObj.controls,
            [controlName]: {
                ...newObj.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, newObj.controls[controlName].validation),
                touched: true
            }
        };
        const updatedEditNode = updateObject(newObj, {controls: updatedControls});
        this.props.onChangeEditNode({editNode: updatedEditNode})
        this.props.onTreeUpdate({
            treeData: changeNodeAtPath({
                treeData: this.props.tree,
                path: this.props.path,
                getNodeKey,
                newNode: updatedEditNode,
            })
        });
    };

    render () {
        const formElementsArray = [];
        for (let key in this.props.editNode.controls) {
            formElementsArray.push({
                id: key,
                config: this.props.editNode.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => {
            if(formElement.config.active){
                return (
                    <Input 
                        key={formElement.id}
                        label={formElement.config.label}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                )
            } else {
                return false
            }
        })

        if(this.props.editNode.children && this.props.editNode.children.length > 0){
            form = (<p>This objective has sub-objectives</p>)
        }

        return (
            <form>
                {form}
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        tree: state.proj.treeData,
        editNode: state.proj.editNode,
        path: state.proj.path
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTreeUpdate: (treeData) => dispatch(actionCreators.updateTree(treeData)),
        onChangeEditNode: (editNode) => dispatch(actionCreators.changeEditNode(editNode))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormGenerator);