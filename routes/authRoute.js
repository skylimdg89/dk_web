var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');

module.exports = function(passport){
    router.get('/login', function (req, res){
        auth.login(req, res);
    });
    router.post('/login_process',
        passport.authenticate('local', {
            successRedirect: '/topic/board',
            failureRedirect: '/auth/login',                                           
            failureFlash: true,
            successFlash:true
        }));
    router.get('/register', function(req, res){
       auth.register(req, res); 
    });
    router.post('/register_process', function(req, res){
        auth.register_process(req, res);
    });
    router.get('/logout', function(req, res){
        auth.logout(req, res);
    });

    return router;
}
