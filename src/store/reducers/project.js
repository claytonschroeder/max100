import * as actionTypes from '../actions/actionTypes';
// import { updateObject } from '../utility';

const initialState = {
    objectives: [
        { id: '1233-1234-1234-1234', name: 'Objective 1', parent: true, children: null},
        { id: '4321-4321-4312-4321', name: 'Objective 2', parent: true, children: null},
        { id: '2314-2314-2314-2314', name: 'Objective 3', parent: true, children: null},
        { id: '4132-4132-4132-4132', name: 'Objective 4', parent: true, children: null}
    ]
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.NEW_ROW:
            console.log('add new row')
            return state;
        case actionTypes.REMOVE_ROW:
            console.log('remove this row: ', action.id)
            return state;
        default: return state
    }
};

export default reducer;