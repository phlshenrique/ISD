const weekdays = [];

exports.post = (req, res, next) => {
   day = {
      day: req.body.day,
      joblist: []
   }
   req.body.joblist.forEach((job, i) => {
      joblist = {
         tarefa: job.tarefa,
         done: job.done,
      }
      day.joblist.push(joblist);
   });
   weekdays.push(day);
   res.status(201).send('Rota POST!');
 };
  
 exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`Rota PUT com ID! --> ${id}`);
 };
  
 exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Rota DELETE com ID! --> ${id}`);
 };
  
 exports.get = (req, res, next) => {
   days = []
   weekdays.forEach((day, i) =>{
      i = {
         "day": day.day,
         "link": {
            'href': `/${day.day}`,
            'rel': `weekdays`,
            'type': 'GET'
         }
      }
      days.push(i);
   })
   res.status(200).send(days);
 };
  
 exports.getById = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Rota GET com ID! ${id}`);
 };