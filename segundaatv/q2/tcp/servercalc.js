const net = require('net')

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

const handleConnection = socket => {
    socket.on('data', data => {
        var msg = data.toString();
        var dados = msg.split(" ");
        // console.log("Mensagem recebida: " + msg);
        socket.write(calculadoraAvancada(dados).toString());
    })
}

const server = net.createServer(handleConnection)
server.listen(4000, '127.0.0.1')