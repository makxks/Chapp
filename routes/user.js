var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.post('/', function (req, res, next) {
  var user = new User({
    email: req.body.email,
    username: req.body.name,
    chats: [],
    contacts: [],
    todos: []
  });
  user.save(function(err, result) {
    console.log(result);
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'User created',
      obj: result
    })
  });
});

router.get('/', function (req, res, next) {
  User.findOne({
    "email": req.body.email
  }), function(err, user){
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    if(user){
      res.status(200).json({
        message: 'Success',
        obj: user
      })
    }

    else{
      res.status(404).json({
        message: 'Not found'
      })
    }

  }
})

module.exports = router;
