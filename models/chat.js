var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required:true},
  isGroup: {type: Boolean, required: true},
  owner: {type: String, required: true},
  users: [{type: String}],
  last200: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Chat', schema);
