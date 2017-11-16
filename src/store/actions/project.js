import * as actionTypes from './actionTypes';

export const newRow = () => {
    return {
        type: actionTypes.NEW_ROW
    };
};

export const removeRow = (id) => {
    return {
        type: actionTypes.REMOVE_ROW,
        id: id
    };
};
