const net = require('net')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const handleConnection = socket => {
    console.log("Alguém sem conectou.")
    socket.on('end', () => {
        console.log('desconectou!')
        socket.end()
        process.exit()
    })
    socket.on('data', data => {
        var msg = data.toString()
        if(msg === 'end'){
            socket.end()
        }
        console.log("Client: " + msg)
    })
    rl.addListener('line', line => {
        socket.write(line)
        if(line === 'end'){
            console.log("Conexão encerrada")
            socket.end()
            process.exit()
        }
    })
}

const server = net.createServer(handleConnection)
server.listen(4000, '127.0.0.1')