const net = require('net')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const client = new net.Socket()
client.connect(4000, '127.0.0.1', () => {
    client.on('data', data => {
        console.log(data.toString());
    })
    rl.addListener('line', line => {
        client.write(line)
    })
})