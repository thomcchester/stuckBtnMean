var express = require('express');
var router = express.Router();
var Submit = require("../models/contact.js");

/*get and post calls for checking individuals information and creating if
it doesnt exist*/
router.route('/')
    .get(function(req,res){
      Submit.find({status: {$ne: 'Deleted'}}, function(err, defaults){
        if(err){console.log(err);}
        res.send(defaults);
      });
    })

    .post(function(req, res){
      var thing = new Submit({
          thingone: req.body.thingone,
          thingtwo: req.body.thingtwo,
      });
      Submit.create(thing, function(err, post){
        if(err){
          console.log(err);
        }
        res.send(post);
      });


    });

    //updating the existing as a put call
    router.route('/changeInfo').put(function(req, res){
        Submit.findOneAndUpdate({ipaddress: req.body.dbuser}, {
          votecount: req.body.countArray
        }, function(err, doc){
          if(err){
            console.log(err);
          }
          res.json();
        });
    });


module.exports = router;
