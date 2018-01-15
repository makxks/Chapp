module.exports = function(io){
  io.on('connection', (socket) => {
   console.log('USER CONNECTED');

   socket.on('disconnect', function(){
     console.log('USER DISCONNECTED');
   });

   socket.on('join', (params, callback) => {
     socket.join(params.groupname);
     callback();
   })

   socket.on('add-message', (message) => {
     io.to(message.groupname).emit('message', {
       type:'new-message',
       text: message.message,
       groupname: message.groupname,
       user: message.user,
       time: message.time
     });
   });
  });
}
