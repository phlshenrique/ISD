const Server = require("socket.io").Server;

const io = new Server(3000);

rooms = ["loby", "room1", "room2", "room3"]

users = [];

var i = 1;
const name = "guest";

io.on("connection", (socket) => {
    socket.name = name + i;
    i = i+1;
    users.push(socket);
    socket.room = rooms[0];
    broadcastWelcome(socket);
    showConnectedUsers(socket);
    // console.log("Chegou conexão");
    // socket.emit("hello", "world");

    // socket.on("hello", (arg) => {
    //     console.log(arg);
    // })
})

function broadcastWelcome(socket){
    for (user of users){
        if(socket.name != user.name && socket.room == user.room){
            user.emit("welcome", socket.name);
        }
    }
}

function showConnectedUsers(socket){
    ret = "";
    for(user of users){
        if(user.name != socket.name){
            ret = ret + user.name + ",";
        }
    }
    socket.emit("users", ret);
}