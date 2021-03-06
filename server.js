var express = require('express');
var fs = require('fs');
var http = require('http');
var path = require('path');

const PORT = process.env.PORT || 80;

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(client){
  client.on('alpha', function(msg){ // relay
    io.emit('alpha', msg);
  });
});

app.use('/game', express.static(path.join(__dirname, 'game')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/game/game.html');
})

server.listen(PORT);
