var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Chat = require('../models/chat');

router.get('/', function(req, res, next){
  User.findOne({
    "email": req.query.email
  }, function(err, user){
    if(err){
      return res.status(500).json({
        title: "An error occurred",
        error: err
      })
    }
    Chat.find({
      "users": { "$in" : [user]}
    }, function(err, chats){
      if(err){
        return res.status(500).json({
          title: "An error occurred",
          error: err
        })
      }
      res.status(200).json({
        message: "Success",
        object: chats
      })
    })
  })
});

router.get('/singleChat', function(req, res, next){
  User.findOne({
    "email": req.query.email
  }, function(err, user){
    if(err){
      return res.status(500).json({
        title: "An error occurred",
        error: err
      })
    }
    Chat.findOne({
      "_id": req.query.id
    }, function(err, chat){
      if(err){
        return res.status(500).json({
          title: "An error occurred",
          error: err
        })
      }
      res.status(200).json({
        message: "Success",
        object: chat
      })
    })
  })
});

router.post('/', function(req, res, next){
  User.findOne({
    "email": req.query.email
  }, function(err, user){
    if(err){
      return res.status(500).json({
        title: "An error occurred",
        error: err
      })
    }
    const usersString = [];
    for (var i=0; i < req.body.users.length; i++){
      usersString.push(req.body.users[i].email);
    }
    var chat = new Chat({
      name: req.body.name,
      description: req.body.description,
      isGroup: req.body.isGroup,
      owner: user.email,
      users: usersString,
      last200: []
    });
    chat.save(function(err, result){
      if(err){
        return res.status(500).json({
          title: "An error occurred",
          error: err
        })
      }
    })
    user.chats.push(chat);
    user.save(function(err, result){
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
});

router.post('/2ndUser', function(req, res, next){
  User.findOne({
    "email": req.query.email
  }, function(err, user){
    if(err){
      return res.status(500).json({
        title: "An error occurred",
        error: err
      })
    }
    const usersString = [];
    for (var i=0; i < req.body.users.length; i++){
      usersString.push(req.body.users[i].email);
    }
    var chat = new Chat({
      name: req.body.name,
      description: req.body.description,
      isGroup: req.body.isGroup,
      owner: req.body.owner.email,
      users: usersString,
      last200: []
    });
    user.chats.push(chat);
    user.save(function(err, result){
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
});

router.patch('/userAcceptNotification', function(req, res, next){
  Chat.findOne({
    "name": req.body.name,
    "owner": req.body.owner
  }, function(err, chat){
    if(err){
      return res.status(500).json({
        title: "An error occurred",
        error: err
      })
    }
    User.findOne({
      "email": req.body.email
    }, function(err, user){
      if(err){
        return res.status(500).json({
          title: "An error occurred",
          error: err
        })
      }
      chat.users.push(user);
      user.chats.push(chat);
      chat.save(function(err, result){
        if(err){
          return res.status(500).json({
            title: "An error occurred",
            error: err
          })
        }
      })
      user.save(function(err, result){
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
})

router.patch('/userLeaveGroup', function(req, res, next){
  Chat.findOne({
    "name": req.body.name,
    "owner": req.body.owner
  }, function(err, chat){
    if(err){
      return res.status(500).json({
        title: "An error occurred",
        error: err
      })
    }
    User.findOne({
      "email": req.body.email
    }, function(err, user){
      if(err){
        return res.status(500).json({
          title: "An error occurred",
          error: err
        })
      }
      chat.update(
        { _id: chat._id },
        { $pull: { 'users': { email: req.body.email } } }
      )
      user.update(
        { _id: user._id },
        { $pull: { 'chats': { name: req.body.name, owner: req.body.owner.email } } }
      )
    })
  })
});

module.exports = router;
