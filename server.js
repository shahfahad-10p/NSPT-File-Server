const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
var request = require('request');
var path = require('path');
var config = require(path.join(__dirname, './config', process.argv[2]));
global.config = config;
const fileRoutes = require('./routes/file');
const syncRoutes = require('./routes/sync');

app.use((req, res, next) => {
    next();
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json({ limit: "15MB", type: 'application/json' }));

app.use('/file', fileRoutes);
app.use('', syncRoutes);

app.get('/', (req, res) => {
    res.send(config.name);
});

function registerWithNameServer() {
    let payload = {
        name: config.name,
        address: config.address
    }
    request.post({ url: `${config.nameServerAddress}/register`, json: payload },
        function (err, httpResponse, body) {
            if (err) {
                console.log("REGISTRATION WITH NAME SERVER FAILED");
                return;
            }
            console.log("REGISTRATION WITH NAME SERVER SUCCESS");
            app.listen(config.port);
        }
    );
}

registerWithNameServer();