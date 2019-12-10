var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Notification = require('../models/notification');

router.post('/', function (req, res, next) {
  User.findOne({
    "email": req.body.receiver
  }, function(err, receiver) {
    var notification = new Notification({
      sender: req.body.sender,
      receiver: req.body.receiver,
      chat: req.body.chat,
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
      receiver.notifications.push(notification);
      res.status(201).json({
        message: 'Notification created',
        obj: result
      })
    });
  })
});

router.get('/', function (req, res, next) {
  User.findOne({
    "email": req.query.email
  }), function(err, user){
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if(user){
      Notification.find({
        "receiver": user
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
  }
});

router.delete('/:receiver/:sender/:timesent', function(req, res, next){
  Notification.findOne({
    "receiver": req.params.receiver,
    "sender": req.params.sender,
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
        res.status.json(200).json({
          message: 'Deleted notification',
          obj: result
        })
      })
    }
  })
});

module.exports = router;
