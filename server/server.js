// importing the liberaryes
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// assigning the main variables
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 80; 
let app = express();
let server = http.createServer(app);
let io = socketIO(server); // adding this will give access to the socket liberary -> http://localhost/socket.io/socket.io.js

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('A New user just connect');

    socket.emit('newMessage', {
        from: "Admin",
        text: "Welcome to the chat app",
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "New User Joined",
        createdAt: new Date().getTime()
    });



    socket.on('createMessage', (message)=>{
        console.log('createMessage', message);
    
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })

    socket.on('disconnect', ()=>{
        console.log('disconnected from server');
    })
})

server.listen(port, ()=>{
    console.log(`Server is uo on port ${port}`);
})