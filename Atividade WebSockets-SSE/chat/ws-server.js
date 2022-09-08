var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({ port: 8080, path: '/testing' });
users = [];
wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('Message in: ' + message);
        if(ws['name'] == null){
            ws['name'] = message;
            users.push(ws);
            console.log('User: ' + ws['name']);
        }else{
            for(const user of users){
                if(user['name'] != ws['name']){
                    user.send(ws['name'] + ': ' + message);
                }
            }
        }
        // console.log('Msg received in server: %s ', message);
    });
    console.log('new connection');
    ws.send('Please inform your name!');
});