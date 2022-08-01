'use strict';

const net = require('net');
const Networker = require('./networker');


let socket = net.createConnection({ port: 8000, host: 'localhost' });
socket.on('connect', () => {
  let networker = new Networker(socket, (data) => {
    console.log('received:', data.readInt8(0));
  });
  networker.init();
  networker.send(1,9, '+');
});