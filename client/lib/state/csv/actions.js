import _ from 'lodash';

import actionTypes from '../actionTypes';


const submitRawCsv = (rawCsv) => injected => {
    return (dispatch, getState) => {
        return injected.utils
            .apiPost('/api/parsed-csv', { rawCsv })
            .then(responseJson => dispatch(receivedParsedCsv(_.get(responseJson, 'table'))))
            .catch(err => dispatch(receivedCsvParsingFailure(_.get(err, 'message'))));
    }
}

const receivedParsedCsv = parsedCsv => ({
    type: actionTypes.RECEIVED_PARSED_CSV,
    payload: parsedCsv
});

const receivedCsvParsingFailure = errorMessage => ({
    type: actionTypes.RECEIVED_CSV_PARSING_FAILURE,
    payload: errorMessage
});

export default {
    submitRawCsv
}