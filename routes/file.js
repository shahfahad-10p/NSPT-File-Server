var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');

const config = require('../config/config.js');

if (!fs.existsSync(config.folder)) {
    fs.mkdir(config.folder, (err) => { });
}

router.post('/upload', function (req, res, next) {
    console.log("INCOMING UPLOAD REQUEST FROM NAME SERVER : ");
    let base64String = req.body.base64;
    let base64Image = base64String.split(';base64,').pop();

    fs.writeFile(path.join(__dirname, '../uploads', req.body.fileName), base64Image, { encoding: 'base64' }, (err) => {
        if (err) {
            return res.status(400).json({ 'error': 'error writing file' });
        }
        return res.json({ 'res': 'BODY SUCCESS' });
    });
});


router.post('/download', function (req, res, next) {
    filepath = path.join(__dirname, '../uploads') + '/' + req.body.fileName;
    res.sendFile(filepath);
});


router.post('/download/text', function (req, res, next) {
    console.log("INCOMING DOWNLOAD REQUEST FROM NAME SERVER FOR : ", req.body.fileName);
    filepath = path.join(__dirname, '../uploads') + '/' + req.body.fileName;
    let fileContent = fs.readFileSync(filepath, 'utf8');
    let response = {
        fileName: req.body.fileName,
        file: fileContent
    }
    res.send(response);
});

module.exports = router;