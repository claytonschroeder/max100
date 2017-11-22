import * as actionTypes from './actionTypes';

export const updateTree = (treeData) => {
    return {
        type: actionTypes.UPDATE_TREE,
        treeData: treeData
    };
};
