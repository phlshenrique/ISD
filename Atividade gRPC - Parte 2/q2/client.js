var PROTO_PATH = __dirname + '/chat.proto';
var readline = require("readline");

//Read terminal Lines
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var proto = grpc.loadPackageDefinition(packageDefinition).chat;

function onData(message){
  console.log(message.text);
}

function main() {
  rl.on("line", function(text) {
    client.send({ text: text }, res => {});
  });
  var target = 'localhost:50051';
  var client = new proto.Chat(target, grpc.credentials.createInsecure());

  let channel = client.join({text: ''})
  channel.on('data', onData);
}

main();
