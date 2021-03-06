import * as actionTypes from './actionTypes';

export const updateTree = (data, key) => {
    return {
        type: actionTypes.UPDATE_TREE,
        ...data
    };
};

export const updateName = (name) => {
    return {
        type: actionTypes.UPDATE_NAME,
        name
    };
};
