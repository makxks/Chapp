var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Chat = require('../models/chat');

router.post('/', function (req, res, next) {
  console.log(req.body);
  var user = new User({
    email: req.body.email,
    username: req.body.name,
    chats: [],
    contacts: [],
    todos: [],
    notifications: []
  });
  user.save(function(err, result) {
    console.log(result);
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    return res.status(201).json({
      message: 'User created',
      obj: result
    })
  });
});

router.get('/:email', function (req, res, next) {
  User.findOne({
    "email": req.params.email
  }, function(err, user){
    if(user){
      console.log("found");
      return res.status(200).json({
        message: 'Success',
        obj: user
      })
    }
    else if(err){
      console.log("error");
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    else{
      return res.status(200).json({
        message: "User doesn't exist yet",
        obj: null
      })
    }
  })
})

router.get('/groupUsers/:id', function (req, res, next) {
  User.find({
    "chats": { "$in" : req.params.id}
  }, function(err, users){
    if(users){
      console.log("found");
      return res.status(200).json({
        message: 'Success',
        obj: users
      })
    }
    else if(err){
      return res.status(500).json({
        message: "An error occurred",
        obj: err
      })
    }
  })
})

module.exports = router;
