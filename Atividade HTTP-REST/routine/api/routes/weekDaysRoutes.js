const weekDaysController = require('../controllers/weekDaysController');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

module.exports = (app) => {
   app.post('/weekday', jsonParser, weekDaysController.post);
   app.put('/weekday/:id', weekDaysController.put);
   app.delete('/weekday/:id', weekDaysController.delete);
   app.get('/weekdays', weekDaysController.get);
   app.get('/weekday/:name', weekDaysController.getById);
}
