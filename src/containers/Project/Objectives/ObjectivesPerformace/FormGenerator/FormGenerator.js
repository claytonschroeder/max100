import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../../../../components/UI/Input/Input';
import * as actionCreators from '../../../../../store/actions/index';
import { updateObject } from '../../../../../store/utility';
import { changeNodeAtPath } from 'react-sortable-tree';


// import classes from './Project.css'

class FormGenerator extends Component {
    state = {

    }
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
        const getNodeKey = ({ treeIndex }) => treeIndex;
        const updatedControls = {
            ...this.props.editNode.controls,
            [controlName]: {
                ...this.props.editNode.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.props.editNode.controls[controlName].validation),
                touched: true
            }
        }
        const updatedEditNode = updateObject(this.props.editNode, {controls: updatedControls});
        this.props.onChangeEditNode({editNode: updatedEditNode})
        this.props.onTreeUpdate({
            treeData: changeNodeAtPath({
                treeData: this.props.tree,
                path: this.props.path,
                getNodeKey,
                newNode: updatedEditNode,
            })
        });
    }

    render () {
        const formElementsArray = [];
        for (let key in this.props.editNode.controls) {
            formElementsArray.push({
                id: key,
                config: this.props.editNode.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => {
            return (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            )
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