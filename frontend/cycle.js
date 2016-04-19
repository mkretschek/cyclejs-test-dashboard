
console.info('Connecting to socket.io...');

var socket = io('http://localhost:8888');

socket.on('connect', function () {
  console.info('connected');

  socket.on('addOrder', function (msg) {
    console.log('ADD ORDER:', msg);
  });
});

