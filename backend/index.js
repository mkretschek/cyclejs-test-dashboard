'use strict';

const http = require('http');

const api = require('./express');
const io = require('./socket');

const server = http.Server(api);

io.attach(server);

console.log('Started at http://localhost:8888');
server.listen(8888);