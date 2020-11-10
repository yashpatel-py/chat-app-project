
// all the requiesd are here
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// all needed js files are linked here
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/isRealString');
const { Users } = require('./utils/users');

// connected the public folder path here because to access the chat.js file
const publicPath = path.join(__dirname, '/../public');

// given poet number to start server
const port = process.env.PORT || 80
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

// the landing page of this
io.on('connection', (socket) => {
  // This show thw message esisting users
  console.log("A new user just connected");

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    // and my this 2 lines this 2 message will be shown
    io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', `Welocome to ${params.room}!`));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', "New User Joined!"));

    callback();
  })

  // my this fucntion the user will not be able to see the above chat if he joins in between
  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback('This is the server:');
  })

  // this will send the user location with latitude and longitude
  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.lng))
    }
  })

  // This will pass the user name which has disconnected from the room and pass to chat.js it will display it
  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left ${user.room} chat room.`))
    }
  });
});

// it will just show the port number is console

// here we are using 80 port because when we develope and write localhost at that time we don't have to mension that like localhost:3000 and all
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})
