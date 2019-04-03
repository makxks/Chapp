module.exports = function(io) {
  io.on('connection', (socket) => {
    socket.on('chat-creation', (chat) => {
      io.emit('created-chat-room', chat);
    });

    socket.on('accepted-invite', (notification) => {
      io.emit('received', notification);
    });

    socket.on('invite-created', (notification) => {
      io.emit('send-invite', notification);
    });
  })
}
