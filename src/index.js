const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

//static files
app.use(express.static(path.join(__dirname,'public')));

//starting serve
server.listen(app.get('port'), ()=>{
    console.log(`[servidor corriendo en ${app.get('port')}]`);
});