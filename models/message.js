var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  text: {type: String, required: true},
  time: {type: Number, required: true},
  user: {type: String, required: true},
  chat: {type: Schema.Types.ObjectId, ref: 'Chat', required: true}
});

module.exports = mongoose.model('Message', schema);
