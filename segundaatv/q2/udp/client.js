const dgram = require('dgram');
const readline = require('readline')

function printEntry(){
    console.log("Informe os dois parametros " + 
        "separados por espaço ' ' e depois a operação " +
        "também separado por espaço! exemplo: '1 1 +'");
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const socket = dgram.createSocket('udp4');

socket.on('message', (msg, rinfo) => {
    console.log(`Resultado: ${msg}`);
    printEntry();
});

rl.addListener('line', line => {
    const socket = dgram.createSocket('udp4');
    socket.send(line, 8081, '127.0.0.1', (err) => {
        socket.close();
    });
})

printEntry();

socket.bind(8082);
