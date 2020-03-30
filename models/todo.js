var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongooseUniqueValidator = require('mongoose-unique-validator');

var User = require('./user');
var Chat = require('./chat');

var schema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required:true},
  ownerEmail: {type: String, required: true},
  targetUsers: [{type: String}],
  deadline: {type: Date},
  importance: {type: String},
  chat: {type: Schema.Types.ObjectId, ref: 'Chat'},
  parentTodo: {type:Schema.Types.ObjectId, ref: 'Todo'},
  subTodos: [{type:Schema.Types.ObjectId, ref: 'Todo'}]
});

schema.post('remove', function(todo) {
  Chat.findOne({
    "name": todo.chat.name,
    "owner": todo.chat.owner
  }, function(err, chat){
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      })
    }
    if(chat){
      chat.todos.pull(todo);
      chat.save();
    }
  })
  for(var i=0; i<todo.targetUsers.length; i++){
    User.findOne({
      "email": todo.targetUsers[i].email
    }, function(err, user){
      if(err){
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        })
      }
      if(user){
        user.todos.pull(todo);
        user.save();
      }
    })
  }
})

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Todo', schema);
