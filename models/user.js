var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required:true},
  chats: [{type: Schema.Types.ObjectId, ref: 'Chat'}],
  contacts: [{type: Schema.Types.ObjectId, ref: 'User'}],
  todos: [{type: Schema.Types.Object.Id, ref: 'Todo'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
