const net = require('net')

const conns = []

const handleConnection = socket => {
    socket.id = Math.floor(Math.random() * 1000);
    socket.write("Informe seu nome");
    socket.on('data', data => {
        if(!socket.hasOwnProperty('name')){
            socket.name = data.toString();
            conns.push(socket);
        }else{
            conns.forEach(conn => {
                if(conn.id != socket.id){
                    conn.write(socket.name + ": " + data);
                }
            })
        }

    })
    // console.log(socket);
}

const server = net.createServer(handleConnection)
server.listen(4000, '127.0.0.1')
