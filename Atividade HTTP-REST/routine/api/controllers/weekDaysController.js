const weekdays = [];

function getDay(req){
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
   return day;
}

function printWeekDay(weekday){
   console.log(weekday.day);
   weekday.joblist.forEach((job, i) => {
      console.log(`Tarefa: ${job.tarefa} done: ${job.done}`);
   })
}

exports.post = (req, res, next) => {
   weekdays.push(getDay(req));
   res.status(201).send();
 };
  
 exports.put = (req, res, next) => {
   let weekdayReq = JSON.parse(req.params.weekday);
   let sended = false;
   for (let i = 0; i < weekdays.length; i++){
      if(weekdays[i].day == weekdayReq.day){
         weekdays[i] = weekdayReq;
         res.status(201).send(`Rota PUT ok!`);
         sended = true;
         return; 
      }
   }
   if(!sended){
      res.status(404).send(`Rota PUT weekday not found!`);
   }
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
            'rel': `weekday`,
            'type': 'GET'
         }
      }
      days.push(i);
   })
   if(days.length != 0){
      res.status(200).send(days);
   }else{
      res.status(204).send(days);
   }
 };
  
 exports.getById = (req, res, next) => {
   const { name } = req.params;
   for(i=0; i<weekdays.length; i++){
      if(weekdays[i].day == name){
         printWeekDay(weekdays[i]);
         res.status(200).send(`Rota GET com ID!\n ${weekdays[i]}`);
         return;
      }
   }
   res.status(204).send(`Rota GET com ID não encontrado!`);
   return 
 };