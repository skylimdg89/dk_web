var express = require('express');
var router = express.Router();

router.use(express.json());

router.get('/', function (req, res){
    res.status(200).send({
        jggap: 'yayaya',
        size: 'large'
    })
});

router.post('/:id', function (req, res){
       const {id} = req.params;
       const {logo} = req.body;

       if(!logo){
        res.status(418).send({message: 'We need a logo!'})
       }
       res.send({
           jggap: `@ with your ${logo} and ID of ${id}` 
       });
});


module.exports = router;
