var express = require('express');
var router = express.Router();

router.get('/available', function (req, res, next) {
    console.log(`I AM ALIVE`);
    res.send({ 'message': 'I AM ALIVE' });
});

module.exports = router;