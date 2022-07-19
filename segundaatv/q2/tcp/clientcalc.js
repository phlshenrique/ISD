const net = require('net')
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

const client = new net.Socket()
client.connect(4000, '127.0.0.1', () => {
    printEntry();
    client.on('data', data => {
        console.log("Resultado: " + data);
        printEntry();
    });
    rl.addListener('line', line => {
        client.write(line);
    })
});