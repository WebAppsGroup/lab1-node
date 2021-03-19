'use strict'
const dayjs = require("dayjs");
const sqlite = require('sqlite3').verbose();

/**
 * Constructor for a Task object.
 * @param {number} id required
 * @param {string} description required
 * @param {boolean} urgent Optional field, default: false
 * @param {boolean} priv Optional field, default: true
 * @param {dayjs} deadline Optional field, default: undefined
 */
function Task(id, description, urgent = false, priv = true, deadline) {
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.priv = priv;
    
    this.deadline = (deadline == undefined) ? undefined : dayjs(deadline);
  
    this.toString = () => {
      return `Id: ${this.id}, 
              Description: ${this.description}, 
              Urgent: ${this.urgent}, 
              Private: ${this.priv},
              Deadline: ${this.deadline ? this.deadline.format('DD/MM/YYYY') : '<undef>'}`;
    }
}

function TaskList(){
    const db = new sqlite.Database('tasks.db', (err) => { 
        if (err) throw err; 
    });

    
  this.loadAll = () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM tasks' ;
      db.all(query, [], (err, rows) => {
        if(err) reject(err);
        
        const tasks = rows.map(t => new Task(t.id, t.description, t.urgent, t.priv, t.deadline));
        resolve(tasks);       
      });            
    });
  }

  this.loadAfterDate = (date) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM tasks WHERE deadline > ?';
      db.all(query, [date.format()], (err, rows) => {
        if(err) reject(err);
        
        const tasks = rows.map(t => new Task(t.id, t.description, t.urgent, t.priv, t.deadline));
        resolve(tasks);
      });    
    });
  }

  this.loadIfWord = (word) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM tasks WHERE description LIKE ?";
      db.all(sql, ["%" + word + "%"], (err, rows) => {
        if(err) reject(err);
        
        const tasks = rows.map(t => new Task(t.id, t.description, t.urgent, t.priv, t.deadline));
        resolve(tasks);    
      });    
    });
  }

}


async function main(data) {

    try {
      const tasklist = new TaskList();
       
      console.log("----- all tasks in the db ---------");
      const tasks = await tasklist.loadAll();
      tasks.forEach( (task) => console.log(task.toString()) );
        
      console.log("----- all tasks after 2021-03-09 @14:10 ---------");
      const next_tasks = await tasklist.loadAfterDate(dayjs('2021-03-09T14:10:00.000Z'));
      next_tasks.forEach( (task) => console.log(task.toString()) );

      console.log("----- all tasks containing \"laundry\" ---------");
      const req_tasks = await tasklist.loadIfWord('laundry');
      req_tasks.forEach( (task) => console.log(task.toString()) );

  
    } catch (error) {
      console.error(error);
      return;
    }
    
  }
  
  main()