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
  if(uuid == null && username == null){
    uuid = message.user;
  }
  console.log(`${message.user}: ${message.text}`);
}
let uuid;
let username;

function main() {
  rl.on("line", function(text) {
    if(username == null){
      username = text.replace(/[\r\n]/gm, '');
      client.send({user: username, text: uuid}, res => {});
    }else{
      client.send({ user: username, text: text }, res => {});
    }
  });
  var target = 'localhost:50051';
  var client = new proto.Chat(target, grpc.credentials.createInsecure());

  let channel = client.join({text: ''})
  channel.on('data', onData);
}

main();
