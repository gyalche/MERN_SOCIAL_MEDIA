const io = require('socket.io')(8800, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
let activeUsers = [];

io.on('connection', (socket) => {
  //add new  user;
  socket.on('new-user-add', (newUserId) => {
    //if user is not added previosuly;
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log('connected User', activeUsers);
    
    //emeit=> when we have to send something to the client side;
    io.emit('get-users', activeUsers);
  });

  //send message;
  socket.on('send-message', (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log('sending form socket of reciver', receiverId);
    console.log('Data', data);
    if (user) {
      io.to(user.socketId).emit('receive-message', data);
    }
  });

  //disconnected from the server;
  socket.on('disconnec', () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log('User Disconnect', activeUsers);
    io.emit('get-users', activeUsers);
  });
});
// const io = require('socket.io')(8800, {
//   cors: {
//     origin: 'http://localhost:3000',
//   },
// });

// let activeUsers = [];

// io.on('connection', (socket) => {
//   //add new User;
//   socket.on('new-user-add', (newUserId) => {
//     //if user is not added previously;
//     if (!activeUsers.some((user) => user.userId === newUserId)) {
//       activeUsers.push({
//         userId: newUserId,
//         socketId: socket.id,
//       });
//     }
//     console.log('Connected users', activeUsers);
//     io.emit('get-users', activeUsers);
//   });

//   socket.on('disconnect', () => {
//     activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
//     console.log('User Disconnect', activeUsers);
//     io.emit('get-users', activeUsers);
//   });
// });
