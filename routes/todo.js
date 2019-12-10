var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Todo = require('../models/todo');
var Chat = require('../models/chat');

router.post('/', function (req, res, next) {
  var todo = new Todo({
    name: req.body.name,
    description: req.body.description,
    owner: req.body.owner,
    targetUsers: req.body.targetUsers,
    deadline: req.body.deadline,
    importance: req.body.importance,
    chat: req.body.chat,
    parentTodo: req.body.parentTodo,
    subTodos: req.body.subTodos
  });
  todo.save(function(err, result) {
    console.log(result);
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    for(var i=0; i < req.body.targetUsers.length; i++){
      User.findOne({
        "email": req.body.targetUsers[i].email
      }, function(err, user){
        if(err){
          res.status(500).json({
            title: "An error occurred",
            error: err
          })
          user.todos.push(todo);
          user.save();
        }
      })
    }
    res.status(201).json({
      message: 'Todo created',
      obj: result
    })
  });
});

router.get('/', function (req, res, next) {
  Chat.findOne({
    "name": req.query.chat,
    "owner": req.query.owner,
  }), function(err, chat){
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if(chat){
      Todo.find({
        "chat": chat
      }, function(err, todos){
        res.status(200).json({
          message: 'Success',
          obj: todos
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

router.delete('/:owner/:name/:deadline', function(req, res, next){
  Todo.findOne({
    "owner": req.params.owner,
    "name": req.params.name,
    "deadline": req.params.deadline
  }, function(err, todo) {
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      })
    }
    else {
      todo.remove(function(err, result){
        if(err){
          return res.status(500).json ({
            title: 'An error occurred',
            error: err
          })
        }
        res.status.json(200).json({
          message: 'Deleted todo',
          obj: result
        })
      })
    }
  })
});

router.patch('/:owner/:name/:deadline', function(req, res, next){
  Todo.findOne({
    "owner": req.params.owner,
    "name": req.params.name,
    "deadline": req.params.deadline
  }, function(err, todo) {
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      })
    }
    else {
      todo.name = req.body.name;
      todo.description = req.body.description;
      todo.targetUsers = req.body.targetUsers;
      todo.deadline = req.body.deadline;
      todo.importance = req.body.importance;

      todo.save(function (err, result){
        if(err) {
          return res.status(500).json({
            title: 'An error occurred',
            error: err
          })
        }
        res.status(200).json({
          message: 'Updated todo',
          obj: result
        })
      })
    }
  })
});

module.exports = router;
