const dgram = require('dgram');
const readline = require('readline')

function calculadoraAvancada(dados){
    var param1 = parseInt(dados[0]);
    var param2 = parseInt(dados[1]);
    switch (dados[2]){
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

const socket = dgram.createSocket('udp4');

socket.on('message', (msg, rinfo) => {
    const socket = dgram.createSocket('udp4');
    var resultado = calculadoraAvancada(msg.toString().split(" ")).toString();
    socket.send(resultado, 8082, '127.0.0.1', (err) => {
        socket.close();
    });
    // console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
});

socket.bind(8081);