var WebSocketServer = require('ws').Server;
var http = require("http");
http.createServer(function (req, res) {
    res.writeHeader(200, {
        "Content-Type": "text/event-stream"
        , "Cache-Control": "no-cache"
        , "Connection": "keep-alive"
        , "Access-Control-Allow-Origin": "*"
    });
    var interval = setInterval(function () {
        var ret = '';
        if(msgs.length != 0){
            for(const msg of msgs){
                ret += msg;
            }
            res.write("data: " + ret + "\n\n");
        }
    }, 1000);
}).listen(9090);
console.log('SSE-Server started!');
function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

wss = new WebSocketServer({ port: 8080, path: '/testing' });
users = [];
msgs = [];
wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        // console.log('Message in: ' + message);
        if(ws['name'] == null){
            ws['name'] = message;
            users.push(ws);
            console.log('User: ' + ws['name']);
        }else{
            var msg = ws['name'] + ': ' + message;
            msgs.push(msg);
            for(const user of users){
                if(user['name'] != ws['name']){
                    user.send(msg);
                }
            }
        }
        // console.log('Msg received in server: %s ', message);
    });
    console.log('new connection ws');
    ws.send('Please inform your name!');
});