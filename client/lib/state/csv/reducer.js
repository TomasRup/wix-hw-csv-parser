import _ from 'lodash';

import actionTypes from '../actionTypes';


const initialState = {
    parsedTable: []
};

export default (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.RECEIVED_PARSED_CSV:
            return _.assign({}, state, { parsedTable: action.payload });

        default:
            return state;
    }

};