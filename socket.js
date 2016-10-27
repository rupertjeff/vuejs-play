// import http from 'http';
// import socketio from 'socket.io';
// import Redis from 'ioredis';
//
// const server = http.Server();
// const io = socketio(server);
// const redis = new Redis();

var server = require('http').Server();
var io = require('socket.io')(server);
var Redis = require('ioredis');
var redis = new Redis();

redis.subscribe('channel-name');

redis.on('message', function (channel, message) {
    message = JSON.parse(message);
    console.log(channel, message);

    io.emit(channel + ':' + message.event, message.data);
});

server.listen(3000);
