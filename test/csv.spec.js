'use strict';

const assert = require('chai').assert;
const os = require('os');

const createCsvParser = require('../lib/csv');


describe('CSV Module', () => {

    let csvParser;

    before(() => {
        csvParser = createCsvParser();
    });

    it('#parse parses one line', done => {
        csvParser
            .parse("test,a,123")
            .then(parsed => parsed.table)
            .then(table => {
                assert.isArray(table);
                assert.deepEqual(table, [["test", "a", "123"]]);
                done();
            });
    });

    it('#parse parses multiple lines', done => {
        csvParser
            .parse(`test,a,123${os.EOL}another,line,works`)
            .then(parsed => parsed.table)
            .then(table => {
                assert.isArray(table);
                assert.deepEqual(table, [["test", "a", "123"], ["another", "line", "works"]]);
                done();
            });
    });

    it('#parse fails on column length mismatch', done => {
        let successfullyFailed = false;

        csvParser
            .parse(`colOne,colTwo${os.EOL}colOne,colTwo,colThree`)
            .catch(() => {
                successfullyFailed = true;
            })
            .then(() => {
                assert.isTrue(successfullyFailed);
                done();
            });
    });

    it('#parse ignores espaced data', done => {
        csvParser
            .parse('"colOne","colTwo"')
            .then(parsed => parsed.table)
            .then(table => {
                assert.deepEqual(table, [["colOne", "colTwo"]]);
                done();
            });
    });

});