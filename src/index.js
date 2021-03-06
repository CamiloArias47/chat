const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

const mongoose = require('mongoose');

// db connection
mongoose.connect('mongodb://localhost/chat-database')
.then(db => console.log('db is conected'))
.catch(err => console.log(err));

//settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

//static files
app.use(express.static(path.join(__dirname,'public')));

//starting serve
server.listen(app.get('port'), ()=>{
    console.log(`[servidor corriendo en ${app.get('port')}]`);
});