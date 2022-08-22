const express = require('express');
const app = express();
require('./api/routes/index')(app); // <--- basta adicionar essa linha
app.use(express.json());
app.listen(3000);


// var express = require('express'),
//   app = express(),
//   port = process.env.PORT || 3000;

// app.listen(port);
// require('./api/routes/index')(app);

// console.log('todo list RESTful API server started on: ' + port);
