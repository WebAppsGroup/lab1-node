'use strict'
const sqlite = require('sqlite3');


;


function Task(id, description, urgent, pri, deadline) { // create an object Task build from passed arguments and return the object
    this.id = id ;
    this.description = description ;
    this.urgent = urgent ;
    this.pri = pri ;
    this.deadline = deadline ;
    this.toString = () => (`Id: ${this.id}, Description: ${this.description}, Urgent: ${this.urgent}, Private: ${this.pri}, Deadline: ${this.deadline}`) ;
}

function TaskList() { // create a function/method that contains functions to be implemented
    const db = new sqlite.Database('tasks.db',
    (err) => { if(err) throw err; });
    
    
    this.add = (task) => { // create function that add to task list the object task passed as argument
        this.tasks.push(task);
    };

    this.getAll = () => {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM tasks ' ;
          db.all(sql, [], (err, rows) => {
            if(err)
              reject(err);
            else {
              const tasks = rows.map(row => new Task(row.id, row.description, row.urgent, row.private, row.deadline));
              
              resolve(tasks);
            }
          });            
        });
      };
    
    
      this.taskDate = (date) => {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM tasks WHERE deadline > ?' ; // replace "?" by parameter [date]
          db.all(sql, [date], (err, rows) => {
            if(err)
              reject(err);
            else {
              const tasks = rows.map(row => new Task(row.id, row.description, row.urgent, row.private, row.deadline));
              resolve(tasks);// .map passes each element of the array rows to the call back function and callback acts on each
            } // element separately and returns the result in a new array
          });            
        });
      };


      this.findtask = (word) => { //word passed by parameter is inputed to the sql query by "?" and replace it by parameter from db.get
      return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM tasks WHERE description=?';
      db.get(sql, [word], (err, row) => {
        if (err)
          reject(err);
        else
          resolve(new Task(row.id, row.description, row.urgent, row.private, row.deadline)) 
      }); //db.get returns only one row so thats why we have row.code ...
    });
      };



    

    this.toString = () => ( this.tasks.map((task)=>(task.toString())).join('\n') );
 
}
 
const main = async () => {
    const taskList = new TaskList();
    let i=0;
  
 //PART one 
    // get all the Tasks
    //const tasks = await taskList.getAll();
    //for(i=0;i<tasks.length;i++)
   // console.log(`${tasks[i]}`);
  
    // get tasks after a certain date
// PART TWO
  //  const tasks2 = await taskList.taskDate('2021-03-10T15:20:00.000Z');
  //  for(i=0;i<tasks2.length;i++)
   // console.log(`${tasks2[i]}`);
// PART THREE

const requiredtask = await taskList.findtask("monday lab");
console.log('Required task is: ' + requiredtask);



    
  }
  
  main();




