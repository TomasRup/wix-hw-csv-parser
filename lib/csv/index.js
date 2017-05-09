"use strict";

const _ = require('lodash');


module.exports = () => {

    const CR = '\r';
    const LF = '\n';
    const COMMA = ',';
    const DOUBLE_QUOTE = '"';
    const EMPTY_STR = '';

    const createReturnable = resultList => Promise.resolve({ table: resultList });
    
    const containsEquallySizedLists = listOfLists => {
        if (!_.isArray(listOfLists) || _.isEmpty(listOfLists)) return false;
        const firstListSize = _.size(listOfLists[0]);
        const differentSizeList = _.find(listOfLists, list => list.length !== firstListSize);
        return differentSizeList === undefined;
    }

    function parse(rawCsv) {
        try {
            if (!rawCsv) throw new Error("Empty input");
            if (_.endsWith(rawCsv, COMMA)) throw new Error("Last field ends with comma");
            
            // Adding new line in the end (if it does not exist) for consistency of algorithm
            if (!_.endsWith(rawCsv, LF)) rawCsv += LF;

            // Defining parsing state
            const rows = [];
            let tempColumns = [];
            let tempString = EMPTY_STR;
            let inQuotes = false;

            // Going through each character of raw string received
            for (let index = 0 ; index < rawCsv.length ; index++) {
                const char = rawCsv.charAt(index);

                // In case we are within quotes, somewhere ...,"...here
                if (inQuotes) {
                    switch (char) {
                        case DOUBLE_QUOTE:
                            const nextChar = rawCsv.charAt(index + 1);
                            if (nextChar == DOUBLE_QUOTE) {
                                tempString += char;
                                index++; // Ignoring the next duoble quote, as we are already adding it
                                break;
                            } else {
                                inQuotes = false;
                                break;
                            }
                        default:
                            tempString += char;
                            break;
                    }

                // In case we are out of quotes, somewhere ...,...here
                } else {
                    switch (char) {
                        case COMMA:
                            tempColumns.push(tempString);
                            tempString = EMPTY_STR;
                            break;
                        case DOUBLE_QUOTE:
                            inQuotes = true;
                            break;
                        case CR:
                            // We don't add it to tempString, LF will do the job
                            break;
                        case LF:
                            tempColumns.push(tempString);
                            rows.push(tempColumns);
                            tempColumns = [];
                            tempString = EMPTY_STR;
                            break;
                        default:
                            tempString += char;
                            break;
                    }
                }
            }

            if (!containsEquallySizedLists(rows)) throw new Error('Column size mismatch!');
            return createReturnable(rows);

        } catch (err) {
            return Promise.reject(err);
        }
    }

    return { parse }
}