import _ from 'lodash';

import actionTypes from '../actionTypes';


const submitRawCsv = (rawCsv) => injected => {
    return (dispatch, getState) => {
        return injected.utils
            .apiPost('/api/parsed-csv', { rawCsv })
            .then(responseJson => dispatch(receivedParsedCsv(_.get(responseJson, 'table'))));
    }
}

const receivedParsedCsv = (parsedCsv) => ({
    type: actionTypes.RECEIVED_PARSED_CSV,
    payload: parsedCsv
});

export default {
    submitRawCsv
}