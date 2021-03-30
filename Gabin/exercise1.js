'use strict'
let dayjs = require('dayjs')
function Task(id, description, urgent = false, privat, deadline ='') {
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.privat = privat || true;
    this.deadline =deadline  && dayjs(deadline);
    this.toString= () =>
        { 
            console.log(` id: ${this.id}, description: ${this.description}, urgent: ${this.urgent}, 
            private: ${this.privat}, deadline: ${this.deadline ?this.deadline.toString(): "Not defined"}`);
}
}


function TaskList() {
    this.listOfTask = [];

    this.addTask = (task) => this.listOfTask.push(task);
    this.sortByDate = () => {
        return [...this.listOfTask].sort(
            (a,b) =>  
            {
                const date1 = a.deadline, date2 = b.deadline;
                if (date1 === date2) return 0;
                else if (date1 === null || date1 === '' ) return 1;
                else if (date2 === null || date2 === '' ) return -1;
                else return date1.diff(date2);
            }
        ).forEach(a => a.toString())
    
    }
        
    this.filterTask = () => {
        return [...this.listOfTask].filter(element => element.urgent).forEach(a => a.toString())

    }
}

let t1 = new Task(1, 'habit', true, false, );
let t2 = new Task(2, 'tricots', true, true, '2021-03-01');
let t3 = new Task(3, 'Jeans', false, true, );
// let t4 =  new Task('',description:'habit', urgent:false,privat:false, deadline ='2021-03-30');
let t5 = new Task(5, 'habit', false);
// Task()

let List = new TaskList()
List.addTask(t1);
List.addTask(t2);
List.addTask(t3);

console.log(List.listOfTask[0].deadline)
List.sortByDate()