"use strict";

global._ = require('lodash');
global.Promise = require('bluebird');

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const config = require('./lib/config')();
const csvParser = require('./lib/csv')();


(() => {
    const app = express();

    app.use('/dist', express.static(path.join(__dirname, './client/dist')));
    app.use(bodyParser.json());

    app.post('/api/parsed-csv', (req, res) => csvParser
        .parse(req.body.rawCsv)
        .then(parsed => res.json(parsed))
        .catch(err => res.status(400).send(err.message || 'Parsing failed.')));

    app.get('*', (req, res) => fs
            .createReadStream(path.join(__dirname, './client/index.html'))
            .pipe(res));

    app.listen(config.PORT, () => console.log(`Server has been started on ${config.PORT}...`));
})();