var PROTO_PATH = __dirname + '/chat.proto';
var readline = require("readline");

//Read terminal Lines
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

let user;

function join(call, callback){
  user = call;
}

function send(call, callback){
  console.log(call.request.text)
}

function main() {
  rl.on("line", function(text) {
    user.write({ text: text }, res => {});
  });
  var server = new grpc.Server();
  server.addService(proto.Chat.service, {join: join, send: send});
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
