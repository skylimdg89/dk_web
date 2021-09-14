var express = require('express');
var router = express.Router();
var author = require('../lib/author');

router.get('/table', function (req, res){
	author.home(req, res);
});
router.post('/create_process', function (req, res){
	author.create_process(req, res);
});
router.get('/update/:pageId', function (req, res){
    author.update(req, res);
});
router.post('/update_process', function (req, res){
    author.update_process(req, res);
}); 
router.post('/delete_process', function (req, res){
    author.delete_process(req, res);
});

module.exports = router;
