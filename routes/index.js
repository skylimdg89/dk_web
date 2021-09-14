var express = require('express');
var router = express.Router();
var dkhome = require('../lib/dkhome');

router.get('/', function (req, res) {
    dkhome.home(req, res);
})

module.exports = router;
