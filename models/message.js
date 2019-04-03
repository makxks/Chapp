var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  text: {type: String, required: true},
  time: {type: Number, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  chat: {type: Schema.Types.ObjectId, ref: 'Chat', required: true},
  target: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Message', schema);
