var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const fs = require('fs');

const config = require('../config/config.js');

if (!fs.existsSync(config.folder)) {
    fs.mkdir(config.folder, (err) => { });
}

var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname);
    }
});

var upload = multer({ storage: store }).single('file');

router.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.status(501).json({ error: err });
        }
        console.log(req.file);
        return res.json({ originalName: req.file.originalname, uploadName: req.file.filename });
    });
});


router.post('/download', function (req, res, next) {
    filepath = path.join(__dirname, '../uploads') + '/' + req.body.filename;
    res.sendFile(filepath);
});

module.exports = router;