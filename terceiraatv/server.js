'use strict';

function calculadoraAvancada(param1, param2, op){
  switch (op){
      case '+':
          return param1 + param2;
      case '-':
          return param1 - param2;
      case '*':
          return param1 * param2;
      case '/':
          return param1 / param2;
  }
}

const net = require('net');
const Networker = require('./networker');

let rooms = {};
let clients = [];
let server = net.createServer();

server.on('connection', (socket) => {
  console.log('new client arrived');

  let networker = new Networker(socket, (data) => {
    console.log('received:', data.readInt8(0), data.readInt8(1), data.toString('utf-8',2));
    let result = calculadoraAvancada(data.readInt8(0), data.readInt8(1), data.toString('utf-8',2));
    console.log('Result: ', result);
    networker.send(String(result));
  });
  networker.init();
  clients.push({ socket, networker });

  socket.on('end', () => {
    console.log('socket end');
  });
  socket.on('close', () => {
    console.log('socket close');
  });
  socket.on('error', (e) => {
    console.log(e);
  });
});

server.on('error', (e) => {
  console.log(e);
});

server.listen(8000);