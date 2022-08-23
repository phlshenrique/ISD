const express = require('express');
var bodyParser = require('body-parser')
const app = express();
var jsonParser = bodyParser.json()

require('./api/routes/index')(app); // <--- basta adicionar essa linha
app.use(express.json());
app.listen(3000, () =>{
    console.log(`Servidor rodando na porta 3000`);
});