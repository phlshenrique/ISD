const crypto = require('crypto');
var PROTO_PATH = __dirname + '/chat.proto';

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

let users = [];

function join(call, callback){
  call.uuid = crypto.randomUUID();
  users.push(call);
  call.write({user: call.uuid, text: "Informe seu nome"});
}

function send(call, callback){
  const index = users.map(elem => elem.uuid).indexOf(call.request.text);
  if(users[index] && users[index].name == null){
    users[index].name = call.request.user; 
  } else {
    let msg;
    if(call.request.text === 'exit'){
      const index = users.map(elem => elem.name).indexOf(call.request.user);
      users.splice(index,1);
      msg = `User ${call.request.user} has disconnected from chat!`;
      // warnThen(`User ${call.request.user} has disconnected from chat!`)
    }

    users.forEach(user => {
      if(user.name != call.request.user){
        if(msg){
          user.write({user: 'Server', text:msg});
        }else{
          user.write({user: call.request.user, text:call.request.text});
        }
      }
    })
    
  }
}

function warnThen(msg){
  users.forEach(user => {
    user.write({user: 'server', text: msg});
  })
}

function main() {
  var server = new grpc.Server();
  server.addService(proto.Chat.service, {join: join, send: send});
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
