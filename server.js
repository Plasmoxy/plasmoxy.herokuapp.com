var express = require('express');
var fs = require('fs');
var http = require('http');

const PORT = process.env.PORT || 80;

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(client){
  client.on('chat message', function(msg){ // relay
    io.emit('chat message', msg);
  });
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.get('/chat', function (req,res) {
  res.sendFile(__dirname + '/chat.html');
})

server.listen(PORT);
