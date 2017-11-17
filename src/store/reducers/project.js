import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    treeData: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.UPDATE_TREE:
            return updateObject(state, action.treeData);
        default: return state
    }
};

export default reducer;