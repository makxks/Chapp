var express = require('express');
var router = express.Router();

var Chat = require('../models/chat');
var Message = require('../models/message');

router.get('/', function(req, res, next){
  User.find({
    "email": req.query.email
  }, function(err, user){
    if(err){
      return res.status(500).json({
        title: "An error occurred",
        error: err
      })
    }
    Message.find({
      "chat": { "name" : req.query.chatName, "owner": req.query.owner, "users": { "$in" : [user]} }
    }, function(messages, err){
      if(err){
        return res.status(500).json({
          title: "An error occurred",
          error: err
        })
      }
      res.status(200).json({
        message: "Success",
        obj: result
      })
    })
  })
})

router.post('/', function(req, res, next){
  Chat.findOne({
    "name": req.body.chatName,
    "owner": req.body.owner
  }, function(chat, err){
    if(err){
      return res.status(500).json({
        title: "An error occurred",
        error: err
      })
    }
    var message = new Message({
       text: req.body.text,
       time: req.body.time,
       user: req.body.user,
       chat: chat,
       target: req.body.target
    })
    if(chat.last200.length >= 200){
      chat.last200.shift();
    }
    chat.last200.push(message);
    chat.save(function(err, result){
      if(err){
        return res.status(500).json({
          title: "An error occurred",
          error: err
        })
      }
      message.save(function(err, result){
        if(err){
          return res.status(500).json({
            title: "An error occurred",
            error: err
          })
        }
        res.status(200).json({
          message: "Success",
          obj: result
        });
      })
    })
  })
});

module.exports = router;
