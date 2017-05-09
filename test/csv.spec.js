'use strict';

const assert = require('chai').assert;

const createCsvParser = require('../lib/csv');


describe('CSV module specification', () => {

    const assertParsed = (inputString, expectedTable, callback) => {
        csvParser
            .parse(inputString)
            .then(parsed => parsed.table)
            .then(table => {
                assert.isArray(table);
                assert.deepEqual(table, expectedTable);
                callback();
            });
    }

    const assertNotParsed = (inputString, callback) => {
        let successfullyFailed = false;

        csvParser
            .parse(inputString)
            .catch(() => {
                successfullyFailed = true;
            })
            .then(() => {
                assert.isTrue(successfullyFailed);
                callback();
            });
    }

    let csvParser;

    before(() => {
        csvParser = createCsvParser();
    });

    it('#parse parses one line', done => {
        assertParsed("test,a,123", [["test", "a", "123"]], done);
    });

    it('#parse parses multiple lines', done => {
        assertParsed(
            "test,a,123\r\nanother,line,works",
            [["test", "a", "123"], ["another", "line", "works"]],
            done
        );
    });

    it('#parse fails on column length mismatch', done => {
        assertNotParsed(`colOne,colTwo\ncolOne,colTwo,colThree`, done);
    });

    it('#parse fails when ended with comma', done => {
        assertNotParsed('a,b,c,', done);
    });

    it('#parse ignores escaped data', done => {
        assertParsed('"colOne","colTwo"', [["colOne", "colTwo"]], done);
    });

    it('#parse is successful with escaped newline', done => {
        assertParsed('"col\nOne","col,\r""Two"', [["col\nOne", "col,\r\"Two"]], done);
    });

    it('#parse fails on empty line', done => {
        assertNotParsed('', done);
    });

});