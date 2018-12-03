const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/config.js');
const fs = require('fs');
const fileRoutes = require('./routes/file');

app.use((req, res, next) => {
    console.log('GLOBAL MIDDLEWARE');
    next();
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/file', fileRoutes);

app.get('/', (req, res) => {
    res.send('APP ROOT');
});

app.listen(3000);