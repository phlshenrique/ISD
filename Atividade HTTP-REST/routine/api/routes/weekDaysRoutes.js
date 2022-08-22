const weekDaysController = require('../controllers/weekDaysController');
module.exports = (app) => {
   app.post('/weekday', weekDaysController.post);
   app.put('/weekday/:id', weekDaysController.put);
   app.delete('/weekday/:id', weekDaysController.delete);
   app.get('/weekdays', weekDaysController.get);
   app.get('/weekday/:id', weekDaysController.getById);
}
