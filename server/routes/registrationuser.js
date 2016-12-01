var express = require('express');
var router = express.Router();
var User = require("../models/registeruser.js");

router.post('/', function(req, res, next){
    User.create(req.body, function(err, post){
        if(err){
            next(err);
        }else{
            res.redirect('/');
        }
    });
});

module.exports = router;
