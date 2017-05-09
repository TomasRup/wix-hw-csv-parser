import _ from 'lodash';

import actionTypes from '../actionTypes';


const initialState = {
    parsedTable: [],
    parsingError: null
};

export default (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.RECEIVED_PARSED_CSV:
            return _.assign({}, state, {
                parsedTable: action.payload,
                parsingError: initialState.parsingError
            });

        case actionTypes.RECEIVED_CSV_PARSING_FAILURE:
            return _.assign({}, state, {
                parsedTable: initialState.parsedTable,
                parsingError: action.payload
            });

        default:
            return state;
    }

};