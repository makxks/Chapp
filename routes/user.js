var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.post('/', function (req, res, next) {
  console.log(req.body.email);
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

module.exports = router;
