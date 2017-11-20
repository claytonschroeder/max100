import * as actionTypes from './actionTypes';

export const updateTree = (treeData) => {
    return {
        type: actionTypes.UPDATE_TREE,
        treeData: treeData
    };
};

export const changeEditNode = (editNode) => {
    return {
        type: actionTypes.CHANGE_EDIT_NODE,
        editNode: editNode
    };
};

export const updateEditNodeControls = (updatedContols) => {
    console.log(updatedContols)
    return {
        type: actionTypes.UPDATE_EDIT_NODE_CONTROLS,
        updatedControls: updatedContols
    };
};
