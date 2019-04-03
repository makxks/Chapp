var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required:true},
  isGroup: {type: Boolean, required: true},
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  todos: [{type: Schema.Types.ObjectId, ref: 'Todo'}],
  last200: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Chat', schema);
