module.exports = function(io) {
  io.on('connection', (socket) => {

    socket.on('chat-creation', (chat) => {
      io.emit('created-chat-room', chat);
    });

    socket.on('accepted-invite', (notification) => {
      io.emit('received', notification);
    });

    socket.on('accepted-group-invite', (notification) => {
      io.emit('received-group', notification);
    })

    socket.on('invite-created', (notification) => {
      io.emit('send-invite', notification);
    });

    socket.on('group-invite-created', (notification) => {
      io.emit('send-group-invite', notification);
    })

    socket.on('edit-group', (group, newGroupName) => {
      io.emit('group-edited', group, newGroupName);
    })

    socket.on('remove-contact', (users) => {
      io.emit('remove-contact-from-list', users);
    });

    socket.on('add-todo', (todo) => {
      io.emit('todo-added', todo);
    })

    socket.on('add-sub-todo', (todo) => {
      io.emit('sub-todo-added', todo);
    })

    socket.on('add-todo-notification', (notification) => {
      io.emit('todo-notification-received', notification)
    })

    socket.on('delete-todo', (todo) => {
      io.emit('todo-deleted', todo);
    })

    socket.on('delete-sub-todo', (todo) => {
      io.emit('sub-todo-deleted', todo);
    })

    socket.on('edit-todo', (todo) => {
      io.emit('todo-edited', todo);
    })

    socket.on('edit-sub-todo', (todo) => {
      io.emit('sub-todo-edited', todo);
    })

    socket.on('complete-todo', (todo) => {
      io.emit('todo-completed', todo);
    })

    socket.on('uncomplete-todo', (todo) => {
      io.emit('todo-uncompleted', todo);
    })

    socket.on('complete-sub-todo', (todo) => {
      io.emit('sub-todo-completed', todo);
    })

    socket.on('uncomplete-sub-todo', (todo) => {
      io.emit('sub-todo-uncompleted', todo);
    })
  })
}
