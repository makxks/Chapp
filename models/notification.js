var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref:'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref:'User', required: true },
  chat: { type: Schema.Types.ObjectId, ref:'Chat', required: true },
  isGroup: { type: Boolean, required: true },
  groupName: { type: String },
  timeSent: { type: Date, require: true },
  isTask: { type: Boolean, required: true },
  task: { type: Schema.Types.ObjectId, ref:'Todo'}
});

schema.post('remove', function(notification) {
  User.findOne({
    "email": notification.receiver.email
  }, function(err, user){
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      })
    }
    if(user){
      user.notifications.pull(notification);
      user.save();
    }
  })
})

module.exports = mongoose.model('Notification', schema);
