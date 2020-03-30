var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Chat = require('../models/chat');
var Notification = require('../models/notification');

router.post('/:email', function (req, res, next) {
  User.findOne({
    "email": req.params.email
  }, function(err, receiver) {
    //if has chat id, retrieve, if not, no chat
    var noteChat = null;
    if(req.body.chat != null){
      Chat.findOne({
        "_id": req.body.chat.id
      }, function(err, chat) {
        noteChat = chat;
      })
    }
    var notification = new Notification({
      sender: req.body.sender,
      receiver: req.body.receiver,
      chat: noteChat,
      isGroup: req.body.isGroup,
      groupName: req.body.groupName,
      timeSent: req.body.timeSent,
      isTask: req.body.isTask,
      task: req.body.task
    });
    notification.save(function(err, result) {
      console.log(result);
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(201).json({
        message: 'Notification created',
        obj: result
      })
    });
  })
});

router.get('/:email', function (req, res, next) {
  User.findOne({
    "email": req.params.email
  }, function(err, user){
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if(user){
      Notification.find({
        "receiver": user.email
      }, function(err, notifications){
        res.status(200).json({
          message: 'Success',
          obj: notifications
        })
      })
    }
    else{
      res.status(404).json({
        message: 'Not found'
      })
    }
  })
});

router.delete('/:receiver/:sender/:timesent', function(req, res, next){
  Notification.findOne({
    // use mongo to get receiver where email in receiver == param sent in, and same for sender
    "receiverEmail": req.params.receiver,
    "senderEmail": req.params.sender,
    "timeSent": req.params.timesent
  }, function(err, notification) {
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      })
    }
    else {
      notification.remove(function(err, result){
        if(err){
          return res.status(500).json ({
            title: 'An error occurred',
            error: err
          })
        }
        res.status(200).json({
          message: 'Deleted notification',
          obj: result
        })
      })
    }
  })
});

module.exports = router;
