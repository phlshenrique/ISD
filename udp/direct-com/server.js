const dgram = require('dgram');
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const socket = dgram.createSocket('udp4');

socket.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
});

rl.addListener('line', line => {
    const socket = dgram.createSocket('udp4');
    socket.send(line, 8082, '127.0.0.1', (err) => {
        socket.close();
    });
})

socket.bind(8081);
