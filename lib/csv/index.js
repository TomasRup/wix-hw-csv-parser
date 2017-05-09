"use strict";

const os = require('os');
const _ = require('lodash');


module.exports = () => {

    const assertNotEmpty = object => {
        if (!object) {
            throw new Error('Empty!');
        }
    }

    const isSpecialCharacter = someChar => [os.EOL, ',', '"'].indexOf(someChar) > -1;

    // TODO: finalize this - implement proper unescaping - handling of special chars
    const unescapeField = field => {
        if (field.charAt(0) === '"' && field.charAt(field.length - 1) === '"') {
            return field.substring(1, field.length - 1);
        }

        return field;
    }

    const splitIgnoreEscaped = (str, separator) => {

        if (!isSpecialCharacter(separator) || str.indexOf(separator) === -1) {
            return _.split(str, separator);
        }

        const splitted = [];
        let tempString = '';

        for (let index = 0 ; index < str.length ; index++) {
            const character = str.charAt(index);
            
            if (character == separator 
                    && index > 0 
                    && str[index - 1] != '"') {
                splitted.push(tempString);
                tempString = '';

            } else if (index === str.length - 1) {
                tempString += character;
                splitted.push(tempString);                

            } else {
                tempString += character;
            }
        };


        return splitted;
    }

    const delimitByCrlf = rawCsv => {
        const stringToSplit = _.endsWith(rawCsv, os.EOL)
            ? rawCsv.substring(0, rawCsv.length - 1)
            : rawCsv;
        return splitIgnoreEscaped(stringToSplit, os.EOL);
    }
    
    const splitLineByComma = line => splitIgnoreEscaped(line, ',');

    const assertConsistency = table => {
        if (!_.isArray(table)) throw new Error('Not an array!');

        if (table.length > 0) {
            const firstRowSize = table[0].length;

            table.forEach((line, lineIndex) => {
                if (line.length !== firstRowSize) {
                    throw new Error(`Columns count mismatch between row 0 and ${lineIndex}`);
                }
            });
        }
    }

    function parse(rawCsv) {
        try {
            assertNotEmpty(rawCsv);
            
            const lines = delimitByCrlf(rawCsv);
            const table = lines.map(splitLineByComma);
            const unescapedTable = table;

            assertConsistency(unescapedTable);
            return Promise.resolve({ table: unescapedTable });

        } catch (err) {
            return Promise.reject(err);
        }
    }

    return {
        parse
    }
}