var WebSocketServer = require('ws').Server;

wss = new WebSocketServer({ port: 8080, path: '/testing' });
var wsr;
wss.on('connection', function (ws) {
  wsr = ws;
  ws.on('message', function (message) {
    console.log('Msg received in server: %s ', message);
    for (msg of msgs){
      if(msg.id == message){
        channelr.ack(msg);
      }
    }
    //Here we have to send an ack in case of authorization
  });
  console.log('new connection');
  // ws.send('Msg from server');
});

// ampq stuff

var amqp = require('amqplib/callback_api');

var channelr;
var msgs = [];

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    channelr = channel;
    var exchange = 'logs';

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      channel.bindQueue(q.queue, exchange, '');

      channel.consume(q.queue, function(msg) {
        if(msg.content) {
            console.log(" [x] %s", msg.content.toString());
            msg.id = Math.floor(Math.random() * 1000);
            msgs.push(msg);
            wsr.send(msg.id + '-' + msg.content.toString());
          }
      }, {
        noAck: false
      });
    });
  });
});
