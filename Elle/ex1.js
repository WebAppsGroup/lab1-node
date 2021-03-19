'use strict'
const dayjs = require("dayjs");

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
    
    this.deadline = (deadline === undefined) ? undefined : dayjs(deadline);
  
    this.toString = () => {
      return `Id: ${this.id}, 
              Description: ${this.description}, 
              Urgent: ${this.urgent}, Private: ${this.priv},
              Deadline: ${this.deadline ? this.deadline.format('DD/MM/YYYY') : '<undef>'}`;
    }
}


function TaskList(){
    this.tasks = [];

    this.addTask = (task) => {
        if(!this.tasks.some(t => t.id === task.id)) 
            this.tasks.push(task);
        else
            throw new Error('already existing task');
    }

    this.sortAndPrint = () => {
        this.tasks.sort((t1,t2) => {
            return !t1.deadline ?  1  :
                   !t2.deadline ?  -1 :  
                   t2.deadline - t1.deadline;
        }).forEach( t => console.log(t.toString()));
    }

    this.filterAndPrint = () => {
        this.tasks.filter(t => t.urgent)
                  .forEach(t => console.log(t.toString()));
    }
}

function main(data) {
    // create some tasks by hand
    const t1 = new Task(1, "studying for WA1", 0, 1)
    const t2 = new Task(2, "workout", 0, 0, "2021-03-16T09:00:00.000Z")
    const t3 = new Task(3, "meeting", 1, 0, "2021-03-08T15:20:00.000Z")
  
    
    const tl = new TaskList();
    tl.addTask(t1);
    tl.addTask(t2);
    tl.addTask(t3);
    
    tl.sortAndPrint();
    console.log('------------');
    tl.filterAndPrint();
  }
  
  main()