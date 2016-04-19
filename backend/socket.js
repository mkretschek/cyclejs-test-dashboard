'use strict';
const socketIo = require('socket.io');

const io = module.exports = socketIo();

let connectionsCount = 0;

io.on('connection', (socket) => {
  io.emit('connect', {totalConnections: ++connectionsCount});

  socket.on('disconnect', () => {
    io.emit(
      'disconnect',
      {totalConnections: connectionsCount && --connectionsCount}
    );
  });
});
