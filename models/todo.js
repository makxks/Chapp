var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required:true},
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  targetUser: {type: Schema.Types.ObjectId, ref: 'User'},
  deadline: {type: Date},
  chat: {type: Schema.Types.ObjectId, ref: 'Chat'},
  parentTodo: {type:Schema.Types.ObjectId, ref: 'Todo'},
  subTodo: [{type:Schema.Types.ObjectId, ref: 'Todo'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Todo', schema);
