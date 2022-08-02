var PROTO_PATH = __dirname + '/helloworld.proto';

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
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

/**
 * Advanced Calculator
 */
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

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});
}

/**
 * Implements the CalcAdvanced RPC method.
 */
function calcAdvanced(call, callback) {
  console.log('Received: ', call.request);
  callback(null, {
    ret: calculadoraAvancada(call.request.param1, call.request.param2, call.request.op)
  });
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {sayHello: sayHello, calcAdvanced: calcAdvanced});
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
