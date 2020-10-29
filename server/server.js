// importing the liberaryes
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// assigning the main variables
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 80; 
let app = express();
let server = http.createServer(app);
let io = socketIO(server); // adding this will give access to the socket liberary -> http://localhost/socket.io/socket.io.js

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('A New user just connect');

    socket.on('disconnect', ()=>{
        console.log('disconnected from server');
    })
})

server.listen(port, ()=>{
    console.log(`Server is uo on port ${port}`);
})