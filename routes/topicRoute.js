var express = require('express');
var router = express.Router();
var topic = require('../lib/topic');

router.get('/board', function (req, res){
	topic.board(req, res);
});

router.get('/create', function (req, res){
	topic.create(req, res);
});
router.post('/create_process', function (req, res){
	topic.create_process(req, res);
});
router.get('/update/:pageId', function (req, res){
	topic.update(req, res);
});
router.post('/update_process', function (req, res){
	topic.update_process(req, res);
});
router.post('/delete_process', function (req, res){
	topic.delete_process(req, res);
});
router.get('/:pageId', function(req, res, next){
	topic.page(req, res, next);
});

module.exports = router;
