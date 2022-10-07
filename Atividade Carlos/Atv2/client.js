const io = require("socket.io-client");
const { parseArgs } = require("util");

const socket = io("ws://localhost:3000");

socket.on("welcome", (arg) => {
    console.log(arg + " acabou de entrar na sala!");
})

socket.on("users", (arg) => {
    if(arg.length > 0){
        console.log(arg + " estão no servidor!");
    }
})